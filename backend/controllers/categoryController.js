const Category = require("../models/category");
const SubCategory = require("../models/subCategory");
const Product = require("../models/product");


// Utility to clean up names
const cleanName = (name) => name.trim().replace(/\s+/g, " ");

// Utility to clean up or generate shortnames
const cleanShortName = (str) => str.trim().toLowerCase().replace(/\s+/g, "-");

exports.createCategory = async (req, res) => {
  let { name, shortname, children, active } = req.body;

  // Validate and clean name
  if (!name || cleanName(name).length < 3) {
    return res.status(400).json({ message: "Name is required and should be at least 3 characters long" });
  }
  name = cleanName(name);

  // Generate or clean shortname
  shortname = shortname ? cleanShortName(shortname) : cleanShortName(name);

  // Coerce 'active' to boolean
  active = typeof active === "boolean" ? active : active === "false" ? false : true;

  try {
    // Check for duplicate category name
    const existingCategoryByName = await Category.findOne({ name });
    if (existingCategoryByName) {
      return res.status(400).json({ message: "Category with this name already exists" });
    }

    // Check for duplicate shortname
    const existingCategoryByShortname = await Category.findOne({ shortname });
    if (existingCategoryByShortname) {
      return res.status(400).json({ message: "Category with this shortname already exists" });
    }

    const newCategory = new Category({
      name,
      shortname,
      children,
      active,
    });

    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    res.status(500).json({ message: "Failed to create category", error });
  }
};

// Get all categories
// Get all categories and deeply populate children (subcategories > products)
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find()
      .populate({
        path: 'children', // subcategories
        populate: {
          path: 'children', // products inside each subcategory
          model: 'Product',
          populate: {
            path: 'subProducts', // optional: if you want subProducts in each product
            model: 'SubProduct'
          }
        }
      });

    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a category
exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    let { name, shortname, children, active } = req.body;

    const updateData = {};

    if (name) {
      const cleanedName = cleanName(name);
      if (cleanedName.length < 3) {
        return res.status(400).json({ message: "Name should be at least 3 characters long" });
      }

      // Check for duplicate name (excluding current category)
      const existingByName = await Category.findOne({ name: cleanedName, _id: { $ne: id } });
      if (existingByName) {
        return res.status(400).json({ message: "Another category with this name already exists" });
      }

      updateData.name = cleanedName;

      // If shortname not provided but name is updated, generate from new name
      if (!shortname) {
        shortname = cleanShortName(cleanedName);
      }
    }

    if (shortname) {
      const cleanedShortName = cleanShortName(shortname);

      // Check for duplicate shortname (excluding current category)
      const existingByShortname = await Category.findOne({ shortname: cleanedShortName, _id: { $ne: id } });
      if (existingByShortname) {
        return res.status(400).json({ message: "Another category with this shortname already exists" });
      }

      updateData.shortname = cleanedShortName;
    }

    if (children) {
      updateData.children = children;
    }

    if (typeof active !== "undefined") {
      updateData.active = typeof active === "boolean" ? active : active === "false" ? false : true;
    }

    const updated = await Category.findByIdAndUpdate(id, updateData, { new: true });

    if (!updated) return res.status(404).json({ message: "Category not found" });

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a category
exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const DUMMY_CATEGORY_ID = "111111111111111111111111";     // Replace with actual dummy category ID
    const DUMMY_SUBCATEGORY_ID = "000000000000000000000000";   // Replace with actual dummy subcategory ID

    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    const subCategoryIds = category.children;

    // Step 1: Reassign affected subcategories to the dummy category
    await SubCategory.updateMany(
      { _id: { $in: subCategoryIds } },
      { $set: { parentCategory: DUMMY_CATEGORY_ID } }
    );

    // Step 2: Reassign products that belong to these subcategories
    await Product.updateMany(
      { subCategoryId: { $in: subCategoryIds } },
      { $set: { subCategoryId: DUMMY_SUBCATEGORY_ID } }
    );

    // Step 3: Delete the category
    await Category.findByIdAndDelete(id);

    // Step 4: Remove this category from the dummy's `children` if needed
    await Category.findByIdAndUpdate(DUMMY_CATEGORY_ID, {
      $addToSet: { children: { $each: subCategoryIds } }
    });

    res.status(200).json({ message: "Category deleted, subcategories reassigned, and products updated." });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete category", error: err.message });
  }
};