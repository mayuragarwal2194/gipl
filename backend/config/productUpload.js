const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const IMAGE_TYPES = /jpeg|jpg|png|webp|gif/;
const MAX_FILE_SIZE = 5 * 1024 * 1024;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === 'featuredImage') {
      cb(null, 'uploads/featured');
    } else if (file.fieldname === 'bannerImage') {
      cb(null, 'uploads/banner');
    } else if (file.fieldname.startsWith('aboutImage')) {
      cb(null, 'uploads/subProducts/about');
    } else {
      cb(new Error('Unexpected field: ' + file.fieldname));
    }
  },
  filename: function (req, file, cb) {
    const uniqueName = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

function checkFileType(file, cb) {
  const isImage =
    IMAGE_TYPES.test(path.extname(file.originalname).toLowerCase()) &&
    IMAGE_TYPES.test(file.mimetype);
  if (isImage) {
    return cb(null, true);
  } else {
    cb('Only image files (jpeg, jpg, png, webp, gif) are allowed!');
  }
}

const uploadMiddleware = multer({
  storage,
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
}).any(); // Accepts all product-related fields

const uploadNone = multer().none();

const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ error: 'Multer error: ' + err.message });
  } else if (err) {
    return res.status(500).json({ error: 'Server error: ' + err.message });
  }
  next();
};

module.exports = {
  uploadMiddleware,
  uploadNone,
  handleMulterError
};