const fs = require('fs');
const path = require('path');

const cleanupUploadedFiles = (files = []) => {
  if (!files || files.length === 0) return;

  files.forEach(file => {
    const filePath = path.join(__dirname, '..', 'uploads', resolveSubfolder(file.fieldname), file.filename);
    fs.unlink(filePath, err => {
      if (err) {
        console.error(`❌ Failed to delete file ${file.filename}:`, err.message);
      } else {
        console.log(`🗑️ Deleted uploaded file: ${file.filename}`);
      }
    });
  });
};

// Resolve subfolder based on fieldname
const resolveSubfolder = (fieldname) => {
  if (fieldname === 'featuredImage') return 'featured';
  if (fieldname === 'galleryImages') return 'gallery';
  if (fieldname.startsWith('variantFeaturedImage')) return 'variants/featured';
  if (fieldname.startsWith('variantGalleryImages')) return 'variants/gallery';
  if (fieldname === 'topImage') return 'categories/top_image';
  if (fieldname === 'parentImage') return 'categories/parent_image';
  if (fieldname === 'childImage') return 'categories/child_image';
  if (fieldname === 'profilePicture') return 'user/profilePicture';
  if (fieldname === 'reviewImages') return 'reviews/review_images';
  if (fieldname === 'reviewVideos') return 'reviews/review_videos';
  return ''; // fallback
};

module.exports = cleanupUploadedFiles;