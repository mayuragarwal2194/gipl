// bulkUploadProducts.js

const fs = require('fs');
const fetch = require('node-fetch');
const FormData = require('form-data');

// ✅ Your API endpoint
const API_URL = 'http://localhost:5000/api/v1/products';

// ✅ Load converted product data
const products = JSON.parse(fs.readFileSync('./convertedProducts.json', 'utf-8'));

async function uploadProduct(product) {
  try {
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('subCategoryId', product.subCategoryId);
    formData.append('subProducts', JSON.stringify(product.subProducts));

    const res = await fetch(API_URL, {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) {
      const error = await res.text();
      console.error(`❌ Failed for "${product.name}":`, error);
    } else {
      console.log(`✅ Uploaded: ${product.name}`);
    }
  } catch (err) {
    console.error(`❌ Error for "${product.name}":`, err.message);
  }
}

async function bulkUpload() {
  for (const product of products) {
    await uploadProduct(product);
  }

  console.log('🚀 Bulk upload finished.');
}

bulkUpload();