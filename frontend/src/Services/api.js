export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const submitJobApplication = async (formData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/career/apply`, {
      method: "POST",
      body: formData, // `fetch` automatically sets correct headers for FormData
    });

    if (!response.ok) {
      throw new Error("Failed to submit application");
    }

    return await response.json();
  } catch (error) {
    console.error("Error submitting application:", error);
    throw error;
  }
};

export const subscribeToNewsletter = async (email) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/newsletter`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong!");
    }

    return data; // Return success response
  } catch (error) {
    throw error.message || "Something went wrong!";
  }
};

export const fetchAllProducts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/products`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch products');
    }

    return data;
  } catch (error) {
    console.error("❌ Error in fetchAllProducts:", error);
    throw error;
  }
};

export const fetchProductById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/products/${id}`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch product');
    }

    return data;
  } catch (error) {
    console.error("❌ Error in fetchProductById:", error);
    throw error;
  }
};

export const getAllCategories = async () => {
  const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/category`);
  if (!res.ok) throw new Error('Failed to fetch categories');
  return res.json();
};

export const fetchProductsBySubCategory = async (subCategoryId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/products/subcategory/${subCategoryId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch products by subcategory");
    }
    return await response.json();
  } catch (error) {
    console.error("Error in fetchProductsBySubCategory:", error);
    throw error;
  }
};

export const fetchSubCategoryByName = async (name) => {
  const res = await fetch(`${API_BASE_URL}/api/v1/subcategory/name/${name}`);
  if (!res.ok) throw new Error("Failed to fetch subcategory by name");
  return res.json();
};

export const fetchProductsBySubCategoryName = async (name) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/products/subcategory/${name}`);
    if (!response.ok) {
      throw new Error("Failed to fetch products by subcategory name");
    }
    return await response.json();
  } catch (error) {
    console.error("Error in fetchProductsBySubCategoryName:", error);
    throw error;
  }
};


