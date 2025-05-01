export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const loginAdmin = async (email, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/admin/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include", // ✅ Ensures cookies are sent
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message);

    return { success: true };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const logoutAdmin = async () => {
  try {
    await fetch(`${API_BASE_URL}/api/v1/admin/auth/logout`, {
      method: "POST",
      credentials: "include", // ✅ Ensures cookies are sent
    });

    return { success: true };
  } catch (error) {
    return { success: false };
  }
};

export const verifyAdmin = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/admin/auth/verify`, {
      method: "GET",
      credentials: "include", // ✅ Ensures cookies are sent
    });

    if (!response.ok) throw new Error("Unauthorized");

    return { authenticated: true };
  } catch (error) {
    return { authenticated: false };
  }
};

// Fetch all quote requests 
export const getAllQuotes = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/quote`);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch quotes");
    }
    return data.data;
  } catch (error) {
    console.error("Error fetching quotes:", error);
    throw error;
  }
};

//  Delete a quote request
export const deleteQuote = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/quote/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to delete quote request");
    }
    return data;
  } catch (error) {
    console.error("Error deleting quote:", error);
    throw error;
  }
};



export const addProduct = async (formData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/products`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Error creating product");

    return data;
  } catch (error) {
    console.error("❌ createProduct error:", error);
    return { error: error.message };
  }
};

export const updateProduct = async (productId, formData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/products/${productId}`, {
      method: "PUT",
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('❌ Backend returned error:', data);
      throw new Error(data.message || "Error updating product");
    }

    return data;
  } catch (error) {
    console.error("❌ updateProduct catch error:", error.message);
    return { error: error.message };
  }
};

export const fetchProducts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/products`);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const fetchProductById = async (productId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/products/${productId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch product details');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    throw error;
  }
};

export const deleteProduct = async (productId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/products/${productId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete product');
    }

    return await response.json();
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

export const getAllSubCategories = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/subcategory`);
    if (!response.ok) {
      throw new Error("Failed to fetch subcategories");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching subcategories:", error);
    return [];
  }
};


// Add a new blog
export const addBlog = async (blogData) => {
  try {
    const formData = new FormData();

    // Append blog fields
    formData.append('title', blogData.title);
    formData.append('slug', blogData.slug);
    formData.append('author', blogData.author || 'Admin');
    formData.append('summary', blogData.summary);
    formData.append('isPublished', blogData.isPublished);

    // If image file is selected by admin
    if (blogData.blogImage) {
      formData.append('blogImage', blogData.blogImage); // Must match field name in multer
    }

    // Convert tags and content arrays to JSON strings
    formData.append('tags', JSON.stringify(blogData.tags || []));
    formData.append('content', JSON.stringify(blogData.content || []));

    const response = await fetch(`${API_BASE_URL}/api/v1/blogs`, {
      method: 'POST',
      body: formData, // No content-type header here — browser will set it correctly
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Error creating blog');

    return data;
  } catch (error) {
    console.error('❌ addBlog error:', error);
    return { error: error.message };
  }
};


// Update an existing blog
export const updateBlog = async (id, blogData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/blogs/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(blogData),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Error updating blog');

    return data;
  } catch (error) {
    console.error('❌ updateBlog error:', error);
    return { error: error.message };
  }
};

// Get all blogs (for admin view)
export const getAllBlogs = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/blogs`);
    const data = await response.json();

    if (!response.ok) throw new Error(data.error || 'Error fetching blogs');
    return data;
  } catch (error) {
    console.error('❌ getAllBlogs error:', error);
    return { error: error.message };
  }
};

// Get a single blog by ID
export const getBlogById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/blogs/${id}`);
    const data = await response.json();

    if (!response.ok) throw new Error(data.error || 'Error fetching blog');
    return data;
  } catch (error) {
    console.error('❌ getBlogById error:', error);
    return { error: error.message };
  }
};

// Delete a blog
export const deleteBlog = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/blogs/${id}`, {
      method: 'DELETE',
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Error deleting blog');

    return data;
  } catch (error) {
    console.error('❌ deleteBlog error:', error);
    return { error: error.message };
  }
};