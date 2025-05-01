const Blog = require('../models/blog');

// Create a new blog
exports.createBlog = async (req, res) => {
  try {
    // Log body and file
    console.log("📦 Request Body:", req.body);
    console.log("🖼 Uploaded File:", req.file);

    const {
      title,
      slug,
      author = "Admin",
      summary,
      tags,
      content,
      isPublished
    } = req.body;

    // Check for duplicate slug
    const existingBlog = await Blog.findOne({ slug });
    if (existingBlog) {
      return res.status(400).json({ error: "Slug already exists" });
    }

    // Determine image source: uploaded or from URL
    const image = req.file
      ? `/uploads/blogs/${req.file.filename}`
      : req.body.image;

    // Parse tags and content if they came in as JSON strings
    const parsedTags = typeof tags === "string" ? JSON.parse(tags) : tags;
    const parsedContent = typeof content === "string" ? JSON.parse(content) : content;

    // Build blog object
    const blog = new Blog({
      title,
      slug,
      author,
      image,
      summary,
      tags: parsedTags,
      content: parsedContent,
      isPublished,
      publishedAt: isPublished ? new Date() : null
    });

    const savedBlog = await blog.save();
    console.log("✅ Saved Blog:", savedBlog);
    res.status(201).json(savedBlog);
  } catch (err) {
    console.error("❌ Error creating blog:", err);
    res.status(500).json({ error: "Failed to create blog", details: err.message });
  }
};

// Get all published blogs
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ publishedAt: -1 }); // Removed the isPublished filter
    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch blogs', details: err.message });
  }
};

// Get blog by slug
exports.getBlogBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const blog = await Blog.findOne({ slug, isPublished: true });

    if (!blog) return res.status(404).json({ error: 'Blog not found' });

    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch blog', details: err.message });
  }
};

// Update a blog (Admin only)
exports.updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      slug,
      author,
      image,
      summary,
      tags,
      content,
      isPublished
    } = req.body;

    const blog = await Blog.findByIdAndUpdate(id, {
      title,
      slug,
      author,
      image,
      summary,
      tags,
      content,
      isPublished,
      publishedAt: isPublished ? new Date() : null
    }, { new: true });

    if (!blog) return res.status(404).json({ error: 'Blog not found' });

    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update blog', details: err.message });
  }
};

// Delete a blog
exports.deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findByIdAndDelete(id);

    if (!blog) return res.status(404).json({ error: 'Blog not found' });

    res.status(200).json({ message: 'Blog deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete blog', details: err.message });
  }
};