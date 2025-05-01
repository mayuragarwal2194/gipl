const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const Product = require('../models/product');
const Category = require('../models/category');
const SubCategory = require('../models/subCategory');
const { cleanupUploadedFiles } = require('../utils/cleanupUploadedFiles'); // optional helper for cleanup

exports.addProduct = async (req, res) => {
  try {
    const { name, subCategoryId, subProducts } = req.body;

    // Validate subCategoryId
    const subCategory = await SubCategory.findById(subCategoryId);
    if (!subCategory) {
      return res.status(404).json({ message: 'SubCategory not found' });
    }

    const parsedSubProducts = subProducts ? JSON.parse(subProducts) : [];

    const featuredImage = req.files?.find(f => f.fieldname === 'featuredImage')?.filename || '';
    const bannerImage = req.files?.find(f => f.fieldname === 'bannerImage')?.filename || '';

    const enhancedSubProducts = parsedSubProducts.map((sp, i) => ({
      ...sp,
      aboutImage: req.files?.find(f => f.fieldname === `aboutImage${i}`)?.filename || ''
    }));

    // Create and save the new product
    const product = new Product({
      name,
      subCategoryId,
      featuredImage,
      bannerImage,
      subProducts: enhancedSubProducts
    });

    await product.save();

    // Push product ID to SubCategory's children array
    subCategory.children.push(product._id);
    await subCategory.save();

    res.status(201).json({ message: '✅ Product created successfully', product });
  } catch (error) {
    console.error('❌ Error in addProduct:', error);
    cleanupUploadedFiles(req.files);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Helper function to delete files from a specific directory
const deleteFiles = (files, dir) => {
  files.forEach(file => {
    const filePath = path.join(__dirname, '../uploads', dir, file);
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(`❌ Error deleting file ${filePath}:`, err);
      }
    });
  });
};

// Delete Product
exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    // Fetch the product
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Delete images
    if (product.featuredImage) {
      deleteFiles([product.featuredImage], 'featured');
    }

    if (product.bannerImage) {
      deleteFiles([product.bannerImage], 'banner');
    }

    if (product.subProducts && product.subProducts.length > 0) {
      const aboutImages = product.subProducts
        .map(sp => sp.aboutImage)
        .filter(Boolean);
      deleteFiles(aboutImages, 'subproducts/about');
    }

    // Delete the product
    await Product.findByIdAndDelete(productId);

    // Pull product reference from SubCategory's children
    await SubCategory.findByIdAndUpdate(product.subCategoryId, {
      $pull: { children: product._id }
    });

    res.json({ message: '✅ Product deleted successfully' });
  } catch (error) {
    console.error('❌ Error in deleteProduct:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate({
        path: 'subCategoryId',
        populate: {
          path: 'parentCategory',
          select: 'name shortname' // Select only name and shortName from the parentCategory
        }
      });

    res.json(products);
  } catch (error) {
    console.error('❌ Error in getAllProducts:', error);
    res.status(500).json({ message: 'Failed to fetch products', error: error.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const productId = req.params._id;

    // Convert productId to ObjectId if it's a string
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: 'Invalid Product ID' });
    }

    const product = await Product.findById(productId)
      .populate({
        path: 'subCategoryId',  // Populate the subCategoryId field
        populate: {
          path: 'parentCategory'  // Populate the parentCategory field inside subCategoryId
        }
      });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    console.error('Error in getProductById:', error);
    res.status(500).json({ message: 'Failed to fetch product details' });
  }
};

exports.getProductByCategory = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;

    // Convert categoryId to ObjectId if it's a string
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      return res.status(400).json({ message: 'Invalid Category ID' });
    }

    // Find the category and populate its children (subcategories)
    const category = await Category.findById(categoryId).populate('children');
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Now, find all products under these subcategories
    const subCategoryIds = category.children.map(subCategory => subCategory._id);

    const products = await Product.find({
      subCategoryId: { $in: subCategoryIds },
    }).populate('subCategoryId'); // Populate the subCategoryId in product

    if (!products.length) {
      return res.status(404).json({ message: 'No products found for this category' });
    }

    res.json(products);
  } catch (error) {
    console.error('Error in getProductByCategory:', error);
    res.status(500).json({ message: 'Failed to fetch products' });
  }
};

exports.getProductBySubCategory = async (req, res) => {
  try {
    const subCategoryId = req.params.subCategoryId;

    // Convert subCategoryId to ObjectId if it's a string
    if (!mongoose.Types.ObjectId.isValid(subCategoryId)) {
      return res.status(400).json({ message: 'Invalid SubCategory ID' });
    }

    // Find the subcategory and populate the parentCategory
    const subCategory = await SubCategory.findById(subCategoryId).populate('parentCategory');
    if (!subCategory) {
      return res.status(404).json({ message: 'SubCategory not found' });
    }

    // Now, find all products that belong to this subcategory
    const products = await Product.find({ subCategoryId: subCategoryId })
      .populate('subCategoryId'); // Populate the subCategoryId in product

    if (!products.length) {
      return res.status(404).json({ message: 'No products found for this subcategory' });
    }

    res.json(products);
  } catch (error) {
    console.error('Error in getProductBySubCategory:', error);
    res.status(500).json({ message: 'Failed to fetch products' });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const productId = req.params._id || req.params.id;
    const { name, subCategoryId, subProducts } = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    if (name) product.name = name;

    if (subCategoryId && subCategoryId !== product.subCategoryId.toString()) {
      const newSubCategory = await SubCategory.findById(subCategoryId);
      if (!newSubCategory) return res.status(400).json({ message: 'Invalid subCategoryId' });

      await SubCategory.findByIdAndUpdate(product.subCategoryId, { $pull: { children: product._id } });
      await SubCategory.findByIdAndUpdate(subCategoryId, { $push: { children: product._id } });

      product.subCategoryId = subCategoryId;
    }

    const featuredImageFile = req.files?.find(f => f.fieldname === 'featuredImage');
    if (featuredImageFile) {
      const oldFeaturedImage = product.featuredImage;
      if (oldFeaturedImage) {
        const oldPath = path.join(__dirname, '..', 'uploads', 'featured', oldFeaturedImage);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      product.featuredImage = featuredImageFile.filename;
    }

    const bannerImageFile = req.files?.find(f => f.fieldname === 'bannerImage');
    if (bannerImageFile) {
      const oldBannerImage = product.bannerImage;
      if (oldBannerImage) {
        const oldPath = path.join(__dirname, '..', 'uploads', 'banner', oldBannerImage);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      product.bannerImage = bannerImageFile.filename;
    }

    if (subProducts) {
      let parsedSubProducts;
      try {
        parsedSubProducts = JSON.parse(subProducts);
      } catch (err) {
        return res.status(400).json({ message: 'Invalid subProducts format', error: err.message });
      }

      const enhancedSubProducts = parsedSubProducts.map((sp, i) => {
        const aboutImageFile = req.files?.find(f => f.fieldname === `aboutImage${i}`);
        const existingAboutImage = product.subProducts[i]?.aboutImage || '';
        if (aboutImageFile) {
          if (existingAboutImage) {
            const oldPath = path.join(__dirname, '..', 'uploads', 'subproducts', 'about', existingAboutImage);
            if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
          }
        }

        return {
          ...sp,
          aboutImage: aboutImageFile?.filename || existingAboutImage
        };
      });

      product.subProducts = enhancedSubProducts;
    }

    await product.save();
    res.status(200).json({ message: '✅ Product updated successfully', product });

  } catch (error) {
    console.error('❌ Error in updateProduct:', error);

    // Safe cleanup
    if (req.files) {
      req.files.forEach(file => {
        const filePath = path.join(__dirname, '..', 'uploads', file.filename);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      });
    }

    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

