import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./SubcategoryPage.css";
import ItemNew from "../ItemNew/ItemNew";
import { API_BASE_URL } from "../../Services/api";

const SubCategoryProducts = () => {
  const { slug } = useParams(); // from route /subcategory/:slug
  const [products, setProducts] = useState([]);
  const [subCategoryName, setSubCategoryName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${API_BASE_URL}/api/v1/products/subcategory/slug/${slug}`);
        const data = await response.json();

        if (response.ok) {
          setProducts(data);
          if (data.length > 0 && data[0].subCategoryId?.name) {
            setSubCategoryName(data[0].subCategoryId.name);
          } else {
            setSubCategoryName("Subcategory");
          }
        } else {
          setError(data.message || "Could not fetch products.");
        }
      } catch (err) {
        console.error("Error loading products:", err);
        setError("Could not fetch products.");
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      loadProducts();
    }
  }, [slug]);

  return (
    <section className="subcategory-section section-padding">
      <div className="container">
        <div className="section-header text-center">
          <h3 className="section-head">{subCategoryName} Products</h3>
        </div>
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : error ? (
          <p className="text-center text-danger">{error}</p>
        ) : products.length > 0 ? (
          <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-4">
            {products.map((item) => (
              <div className="col" key={item._id}>
                <ItemNew
                  id={item._id}
                  image={`${API_BASE_URL}/uploads/featured/${item.featuredImage}`}
                  itemName={item.name}
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center">No products found.</p>
        )}
      </div>
    </section>
  );
};

export default SubCategoryProducts;