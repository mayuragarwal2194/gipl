const mongoose = require('mongoose');

// SubProduct Schema (nested inside Product)
const subProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  aboutImage: {
    type: String,
    default: '',
  },
  description: {
    type: [String],
    default: [],
  },
  specialFeatures: {
    type: [String],
    default: [],
  },
  applications: {
    type: [String],
    default: [],
  }
}, { timestamps: true });

// Product Schema
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  subCategoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SubCategory',
    required: true
  },
  featuredImage: {
    type: String,
    default: '',
  },
  bannerImage: {
    type: String,
    default: '',
  },
  subProducts: [subProductSchema] // Embedded subproducts
}, { timestamps: true });

// Pre-save hook to clean up empty strings in subProducts arrays
productSchema.pre('save', function (next) {
  this.subProducts.forEach(sub => {
    sub.description = sub.description.filter(p => p.trim() !== '');
    sub.specialFeatures = sub.specialFeatures.filter(p => p.trim() !== '');
    sub.applications = sub.applications.filter(p => p.trim() !== '');
  });
  next();
});

module.exports = mongoose.model('Product', productSchema);