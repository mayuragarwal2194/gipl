const mongoose = require("mongoose");
const SubCategory = require("../models/subCategory");
const Category = require("../models/category");
const Product = require('../models/product');
const slugify = require("slugify");
const cleanName = (name) => name.trim().replace(/\s+/g, " ");

exports.createSubCategory = async (req, res) => {
  try {
    let { name, parentCategory, children, active } = req.body;

    if (!name || cleanName(name).length < 3) {
      return res
        .status(400)
        .json({ message: "Name is required and should be at least 3 characters long" });
    }

    // Clean and generate slug
    name = cleanName(name);
    const slug = slugify(name, { lower: true, strict: true });

    // Validate parentCategory ObjectId
    if (!mongoose.Types.ObjectId.isValid(parentCategory)) {
      return res.status(400).json({ message: "Invalid parent category ID" });
    }

    // Optional: validate children
    if (children && !Array.isArray(children)) {
      return res
        .status(400)
        .json({ message: "Children must be an array of product IDs" });
    }

    // Normalize active only if provided, else let Mongoose apply default (false)
    const parsedActive =
      typeof active !== "undefined"
        ? typeof active === "boolean"
          ? active
          : String(active).toLowerCase() !== "false"
        : undefined;

    // Check for duplicate name under same parent
    const existingSub = await SubCategory.findOne({ name, parentCategory });
    if (existingSub) {
      return res
        .status(400)
        .json({
          message:
            "SubCategory with this name already exists under the selected category",
        });
    }

    // Build new subcategory object
    const newSubCategoryData = {
      name,
      slug,
      parentCategory,
      ...(children && { children }),
      ...(typeof parsedActive !== "undefined" && { active: parsedActive }),
    };

    const newSubCategory = new SubCategory(newSubCategoryData);
    const savedSubCategory = await newSubCategory.save();

    // Update parent category
    await Category.findByIdAndUpdate(parentCategory, {
      $addToSet: { children: savedSubCategory._id },
    });

    res.status(201).json(savedSubCategory);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to create subcategory", error: err.message });
  }
};

exports.getAllSubCategories = async (req, res) => {
  try {
    const subCategories = await SubCategory.find().populate("parentCategory", "name");
    res.status(200).json(subCategories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateSubCategory = async (req, res) => {
  try {
    const { id } = req.params;
    let { name, parentCategory, children, active } = req.body;

    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid subcategory ID" });
    }

    const subCategory = await SubCategory.findById(id);
    if (!subCategory) {
      return res.status(404).json({ message: "SubCategory not found" });
    }

    const updateData = {};

    // --- Handle Name (and Slug) ---
    if (name) {
      const cleanedName = cleanName(name);
      if (cleanedName.length < 3) {
        return res.status(400).json({
          message: "Name should be at least 3 characters long",
        });
      }

      const existing = await SubCategory.findOne({
        name: cleanedName,
        parentCategory: parentCategory || subCategory.parentCategory,
        _id: { $ne: id },
      });

      if (existing) {
        return res.status(400).json({
          message:
            "SubCategory with this name already exists under the selected category",
        });
      }

      updateData.name = cleanedName;
      updateData.slug = slugify(cleanedName, { lower: true, strict: true });
    }

    // --- Handle Active ---
    if (typeof active !== "undefined") {
      updateData.active =
        typeof active === "boolean"
          ? active
          : String(active).toLowerCase() !== "false";
    }

    // --- Handle Children ---
    if (typeof children !== "undefined") {
      if (!Array.isArray(children)) {
        return res.status(400).json({
          message: "Children must be an array of product IDs",
        });
      }
      updateData.children = children;
    }

    // --- Handle Parent Category ---
    if (
      parentCategory &&
      String(parentCategory) !== String(subCategory.parentCategory)
    ) {
      if (!mongoose.Types.ObjectId.isValid(parentCategory)) {
        return res.status(400).json({ message: "Invalid parent category ID" });
      }

      // Remove from old parent
      if (subCategory.parentCategory) {
        await Category.findByIdAndUpdate(subCategory.parentCategory, {
          $pull: { children: subCategory._id },
        });
      }

      // Add to new parent
      await Category.findByIdAndUpdate(parentCategory, {
        $addToSet: { children: subCategory._id },
      });

      updateData.parentCategory = parentCategory;
    }

    // --- Perform Update ---
    const updated = await SubCategory.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({
      message: "Failed to update subcategory",
      error: err.message,
    });
  }
};

exports.deleteSubCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const DUMMY_SUBCATEGORY_ID = "000000000000000000000000"; // Your fixed uncategorized subcategory ID

    // Find the subcategory to get its parentCategory before deleting
    const subCategory = await SubCategory.findById(id);
    if (!subCategory) {
      return res.status(404).json({ message: "SubCategory not found" });
    }

    // Delete the subcategory
    await SubCategory.findByIdAndDelete(id);

    // Remove reference from parent category
    await Category.findByIdAndUpdate(subCategory.parentCategory, {
      $pull: { children: id },
    });

    // Reassign related products to dummy subcategory
    await Product.updateMany(
      { subCategoryId: id },
      {
        $set: {
          subCategoryId: DUMMY_SUBCATEGORY_ID,
        },
      }
    );

    res.status(200).json({ message: "SubCategory deleted and products reassigned to 'Uncategorized'" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/subcategory/name/:name
exports.getSubCategoryByName = async (req, res) => {
  try {
    const name = req.params.name;
    const subCategory = await SubCategory.findOne({ name: { $regex: new RegExp(`^${name}$`, 'i') } }); // case-insensitive match

    if (!subCategory) return res.status(404).json({ message: 'Subcategory not found' });
    res.json(subCategory);
  } catch (err) {
    console.error("Error in getSubCategoryByName:", err);
    res.status(500).json({ message: "Server error" });
  }
};

