import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./SubcategoryPage.css";
import ItemNew from "../ItemNew/ItemNew";
import {
  API_BASE_URL,
  fetchProductsBySubCategory,
  fetchSubCategoryByName,
} from "../../Services/api";

const SubcategoryPage = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [subCategoryName, setSubCategoryName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadSubcategoryAndProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        // 1. Fetch subcategory by name
        const subCategory = await fetchSubCategoryByName(id);
        if (!subCategory?._id) {
          setError("Subcategory not found.");
          return;
        }

        setSubCategoryName(subCategory.name);

        // 2. Fetch products using subcategory _id
        const productsData = await fetchProductsBySubCategory(subCategory._id);
        setProducts(productsData);
      } catch (err) {
        console.error(err);
        setError("Could not fetch products.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadSubcategoryAndProducts();
    }
  }, [id]);

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

export default SubcategoryPage;