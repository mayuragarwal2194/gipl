const express = require("express");
const {
  createBlog,
  getAllBlogs,
  getBlogBySlug,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");

const { blogUpload, handleBlogUploadError } = require("../config/blogUpload");

const router = express.Router();

// 👇 Apply upload middleware to the blog creation route
router.post("/", blogUpload.single("blogImage"), handleBlogUploadError, createBlog);

router.get("/", getAllBlogs);
router.get("/:slug", getBlogBySlug);
router.put("/:id", updateBlog);
router.delete("/:id", deleteBlog);

module.exports = router;