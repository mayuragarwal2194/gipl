import React, { useRef, useEffect, useState } from "react";
import { API_BASE_URL, getAllSubCategories } from "../../../services/api"; // adjust path if needed
import Swal from "sweetalert2";

const ProductDetailsForm = ({
  name,
  setName,
  subCategoryId,
  setSubCategoryId,
  featuredImage,
  bannerImage,
  imagePreviews,
  setFeaturedImage,
  setBannerImage,
  setImagePreviews,
}) => {
  const featuredInputRef = useRef(null);
  const bannerInputRef = useRef(null);

  const [subCategoryOptions, setSubCategoryOptions] = useState([]);

  useEffect(() => {
    const fetchSubCategories = async () => {
      const subcategories = await getAllSubCategories();
      setSubCategoryOptions(subcategories);
    };
    fetchSubCategories();
  }, []);

  useEffect(() => {
    if (featuredImage && !imagePreviews.featuredImage) {
      setImagePreviews((prev) => ({
        ...prev,
        featuredImage: featuredImage.name || featuredImage, // supports File object or string
      }));
    }
    if (bannerImage && !imagePreviews.bannerImage) {
      setImagePreviews((prev) => ({
        ...prev,
        bannerImage: bannerImage.name || bannerImage,
      }));
    }
  }, [featuredImage, bannerImage, imagePreviews, setImagePreviews]);

  const getImageSrc = (preview, type) => {
    if (!preview) return null;

    if (preview.startsWith("blob:") || preview.startsWith("http")) {
      return preview; // Already a valid preview or absolute URL
    }

    if (type === "featuredImage") return `${API_BASE_URL}/uploads/featured/${preview}`;
    if (type === "bannerImage") return `${API_BASE_URL}/uploads/banner/${preview}`;

    return `${API_BASE_URL}/${preview}`;
  };


  const handleImageChange = (type, file) => {
    if (!file) return;

    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!validTypes.includes(file.type)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid file type',
        text: 'Only JPG, PNG, WEBP, GIF images are allowed.',
      });
      return;
    }

    if (file.size > maxSize) {
      Swal.fire({
        icon: 'error',
        title: 'File too large',
        text: 'Image must be less than 5MB.',
      });
      return;
    }

    if (imagePreviews[type]) URL.revokeObjectURL(imagePreviews[type]);

    if (type === "featuredImage") setFeaturedImage(file);
    if (type === "bannerImage") setBannerImage(file);

    setImagePreviews((prev) => ({
      ...prev,
      [type]: URL.createObjectURL(file),
    }));
  };


  const handleRemoveImage = (type) => {
    if (imagePreviews[type]?.startsWith("blob:")) {
      URL.revokeObjectURL(imagePreviews[type]);
    }

    setImagePreviews((prev) => ({
      ...prev,
      [type]: null,
    }));

    if (type === "featuredImage") {
      setFeaturedImage(null);
      if (featuredInputRef.current) featuredInputRef.current.value = null;
    }
    if (type === "bannerImage") {
      setBannerImage(null);
      if (bannerInputRef.current) bannerInputRef.current.value = null;
    }
  };

  return (
    <>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Product Name</label>
        <input
          type="text"
          className="form-control"
          id="name"
          required
          value={name}
          autoComplete="name"
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="subCategoryId" className="form-label">Subcategory</label>
        <select
          className="form-select"
          id="subCategoryId"
          required
          value={subCategoryId}
          onChange={(e) => setSubCategoryId(e.target.value)}
        >
          <option value="">-- Select Subcategory --</option>
          {subCategoryOptions.map((sub) => (
            <option key={sub._id} value={sub._id}>
              {sub.name} {sub.parentCategory?.name ? `(${sub.parentCategory.name})` : ""}
            </option>
          ))}
        </select>
      </div>

      {/* Featured Image Upload */}
      <div className="mb-3">
        <label className="form-label" htmlFor="featuredImage">Featured Image</label>
        <input
          type="file"
          className="form-control"
          id="featuredImage"
          ref={featuredInputRef}
          onChange={(e) => handleImageChange("featuredImage", e.target.files[0])}
        />
        <small className="text-muted d-block mt-2">
          (Only JPG, PNG, WEBP, GIF allowed. Max size: 5MB.)
        </small>
        {imagePreviews.featuredImage && (
          <div className="position-relative d-inline-block mt-4">
            <img
              src={getImageSrc(imagePreviews.featuredImage, "featuredImage")}
              alt="Featured Preview"
              className="border border-dark-subtle rounded"
              style={{ width: '100px' }}
            />
            <i
              className="fa-solid fa-circle-xmark position-absolute top-0 end-0"
              onClick={() => handleRemoveImage("featuredImage")}
              title="Remove Image"
              style={{
                cursor: "pointer",
                fontSize: "1.2rem",
                transform: "translate(50%, -50%)",
              }}
            ></i>
          </div>
        )}
      </div>

      {/* Banner Image Upload */}
      <div className="mb-3">
        <label className="form-label" htmlFor="bannerImage">Banner Image</label>
        <input
          type="file"
          className="form-control"
          id="bannerImage"
          ref={bannerInputRef}
          onChange={(e) => handleImageChange("bannerImage", e.target.files[0])}
        />
        <small className="text-muted d-block mt-2">
          (Only JPG, PNG, WEBP, GIF allowed. Max size: 5MB.)
        </small>
        {imagePreviews.bannerImage && (
          <div className="position-relative d-inline-block mt-4">
            <img
              src={getImageSrc(imagePreviews.bannerImage, "bannerImage")}
              alt="Banner Preview"
              className="border border-dark-subtle rounded"
              style={{ width: '100px' }}
            />
            <i
              className="fa-solid fa-circle-xmark position-absolute top-0 end-0"
              onClick={() => handleRemoveImage("bannerImage")}
              title="Remove Image"
              style={{
                cursor: "pointer",
                fontSize: "1.2rem",
                transform: "translate(50%, -50%)",
              }}
            ></i>
          </div>
        )}
      </div>

      <hr />
    </>
  );
};

export default ProductDetailsForm;