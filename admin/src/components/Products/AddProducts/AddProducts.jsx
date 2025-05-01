import React, { useState, useEffect } from "react";
import { addProduct, fetchProductById, updateProduct, API_BASE_URL } from "../../../services/api";
import Swal from "sweetalert2";
import ProductDetailsForm from "../ProductDetailsForm/ProductDetailsForm";
import VariantsManager from "../VariantsManager/VariantsManager";
import { useParams, useNavigate } from "react-router-dom";

const AddProduct = () => {
  const { productId } = useParams();  // Change id to productId
  const navigate = useNavigate();

  // Debugging the productId from URL
  console.log("Product ID from URL:", productId);  // Debug: Log the product ID from the URL

  const [name, setName] = useState("");
  const [subCategoryId, setSubCategoryId] = useState("");
  const [featuredImage, setFeaturedImage] = useState(null);
  const [bannerImage, setBannerImage] = useState(null);
  const [imagePreviews, setImagePreviews] = useState({
    featuredImage: null,
    bannerImage: null,
  });

  const [subProducts, setSubProducts] = useState([
    {
      name: "",
      aboutImage: null,
      aboutImagePreview: null,
      description: [""],
      specialFeatures: [""],
      applications: [""],
    },
  ]);

  useEffect(() => {
    if (productId) {
      console.log(`Editing product with ID: ${productId}`); // Debug: Product is in Edit mode
      (async () => {
        try {
          const product = await fetchProductById(productId);
          console.log("Fetched product data: ", product);  // Debug: Log fetched product data

          setName(product.name);
          setSubCategoryId(product.subCategoryId?._id || "");
          setImagePreviews({
            featuredImage: product.featuredImage
              ? `${import.meta.env.VITE_API_BASE_URL}/uploads/featured/${product.featuredImage}`
              : null,
            bannerImage: product.bannerImage
              ? `${import.meta.env.VITE_API_BASE_URL}/uploads/banner/${product.bannerImage}`
              : null,
          });
          setSubProducts(
            product.subProducts.map((sp) => ({
              ...sp,
              aboutImage: null,
              aboutImagePreview: sp.aboutImage
                ? `${import.meta.env.VITE_API_BASE_URL}/uploads/subproducts/about/${sp.aboutImage}`
                : null,
            }))
          );
        } catch (err) {
          Swal.fire("Error", err.message || "Failed to load product", "error");
        }
      })();
    } else {
      console.log("Adding new product (No product ID)");  // Debug: Product is in Add mode
    }
  }, [productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Form submitted with the following data:");
    console.log({
      name,
      subCategoryId,
      featuredImage,
      bannerImage,
      subProducts,
    });

    const formData = new FormData();
    formData.append("name", name);
    formData.append("subCategoryId", subCategoryId);

    if (featuredImage) {
      formData.append("featuredImage", featuredImage);
    }

    if (bannerImage) {
      formData.append("bannerImage", bannerImage);
    }

    formData.append("subProducts", JSON.stringify(subProducts));

    subProducts.forEach((sp, i) => {
      if (sp.aboutImage) {
        formData.append(`aboutImage${i}`, sp.aboutImage);
      }
    });

    try {
      if (productId) {
        // Edit mode
        console.log(`Updating product with ID: ${productId}`);
        const res = await updateProduct(productId, formData);
        Swal.fire({
          title: "Product Updated!",
          icon: "success",
          confirmButtonText: "View Product",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate(`/dashboard/product/${productId}`);
          }
        });
      } else {
        // Add mode
        console.log("Creating a new product...");
        const res = await addProduct(formData);
        const newProductId = res?.data?.product?._id || res?.product?._id;

        // Reset form
        setName("");
        setSubCategoryId("");
        setFeaturedImage(null);
        setBannerImage(null);
        setImagePreviews({ featuredImage: null, bannerImage: null });
        setSubProducts([
          {
            name: "",
            aboutImage: null,
            aboutImagePreview: null,
            description: [""],
            specialFeatures: [""],
            applications: [""],
          },
        ]);

        Swal.fire({
          title: "Product Created!",
          icon: "success",
          showCancelButton: true,
          confirmButtonText: "View Product",
          cancelButtonText: "Close",
        }).then((result) => {
          if (result.isConfirmed && newProductId) {
            navigate(`/dashboard/product/${newProductId}`);
          }
        });
      }
    } catch (err) {
      console.error('Error while saving product:', err);
      Swal.fire({
        title: "Error",
        text: err.message || "Something went wrong while saving the product.",
        icon: "error",
      });
    }
  };

  // Cleanup on component unmount to revoke object URLs for previews
  useEffect(() => {
    return () => {
      if (imagePreviews.featuredImage) URL.revokeObjectURL(imagePreviews.featuredImage);
      if (imagePreviews.bannerImage) URL.revokeObjectURL(imagePreviews.bannerImage);
      subProducts.forEach((sp) => {
        if (sp.aboutImagePreview) URL.revokeObjectURL(sp.aboutImagePreview);
      });
    };
  }, [imagePreviews, subProducts]);

  return (
    <div className="container mt-5">
      <button
        className="btn btn-secondary mb-3"
        onClick={() => navigate("/dashboard/viewproducts")}
      >
        ← View Products
      </button>

      <h2>{productId ? "Edit Product" : "Add Product"}</h2>
      <form onSubmit={handleSubmit}>
        <ProductDetailsForm
          name={name}
          setName={setName}
          subCategoryId={subCategoryId}
          setSubCategoryId={setSubCategoryId}
          featuredImage={featuredImage}
          bannerImage={bannerImage}
          imagePreviews={imagePreviews}
          setFeaturedImage={setFeaturedImage}
          setBannerImage={setBannerImage}
          setImagePreviews={setImagePreviews}
        />

        <VariantsManager
          subProducts={subProducts}
          setSubProducts={setSubProducts}
        />

        <button type="submit" className="btn btn-success d-block m-auto">
          {productId ? "Update Product" : "Create Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;