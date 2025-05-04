const SubCategory = require("../models/subCategory");
const Category = require("../models/category");
const Product = require('../models/product');

const cleanName = (name) => name.trim().replace(/\s+/g, " ");

exports.createSubCategory = async (req, res) => {
  try {
    let { name, parentCategory, children, active } = req.body;

    if (!name || cleanName(name).length < 3) {
      return res
        .status(400)
        .json({ message: "Name is required and should be at least 3 characters long" });
    }

    name = cleanName(name);
    active = typeof active === "boolean" ? active : active === "false" ? false : true;

    // Check for duplicate subcategory name under the same parent
    const existingSub = await SubCategory.findOne({ name, parentCategory });
    if (existingSub) {
      return res.status(400).json({ message: "SubCategory with this name already exists under the selected category" });
    }

    const newSubCategory = new SubCategory({
      name,
      parentCategory,
      children,
      active,
    });

    const savedSubCategory = await newSubCategory.save();

    // Add subcategory to parent category
    await Category.findByIdAndUpdate(parentCategory, {
      $addToSet: { children: savedSubCategory._id },
    });

    res.status(201).json(savedSubCategory);
  } catch (err) {
    res.status(500).json({ message: "Failed to create subcategory", error: err.message });
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

    const subCategory = await SubCategory.findById(id);
    if (!subCategory) {
      return res.status(404).json({ message: "SubCategory not found" });
    }

    const updateData = {};

    // Name check
    if (name) {
      const cleanedName = cleanName(name);
      if (cleanedName.length < 3) {
        return res.status(400).json({ message: "Name should be at least 3 characters long" });
      }

      // Check for duplicate name (excluding current subcategory)
      const duplicate = await SubCategory.findOne({ name: cleanedName, _id: { $ne: id } });
      if (duplicate) {
        return res.status(400).json({ message: "SubCategory with this name already exists" });
      }

      updateData.name = cleanedName;
    }

    // Handle active status
    if (typeof active !== "undefined") {
      updateData.active = typeof active === "boolean" ? active : active === "false" ? false : true;
    }

    // Handle children
    if (children) updateData.children = children;

    // Handle parentCategory change
    if (parentCategory && parentCategory !== String(subCategory.parentCategory)) {
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

    const updated = await SubCategory.findByIdAndUpdate(id, updateData, { new: true });

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

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

