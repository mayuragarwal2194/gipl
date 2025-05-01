import React from "react";
import { useParams } from "react-router-dom";
import { products } from "../../Data/ProductData";
import "./SubcategoryPage.css";
import ItemNew from "../ItemNew/ItemNew";

const SubcategoryPage = () => {
  const { id } = useParams();

  console.log("URL Subcategory ID:", id);

  // Flatten subcategories and find the matching one
  const subcategory = products
    .flatMap((category) => category.subCategories || []) // Ensure subCategories exists
    .find((sub) => sub.name.toLowerCase() === id.toLowerCase()); // Case insensitive match

  console.log("Found Subcategory:", subcategory);

  // If no subcategory is found, show a message
  if (!subcategory) {
    return <h2 className="text-center">Subcategory not found</h2>;
  }

  // Filtered products from the subcategory
  const filteredProducts = subcategory.products || [];

  return (
    <section className="subcategory-section section-padding">
      <div className="container">
        <h2 className="text-center">{subcategory.name} Products</h2>
        <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((item) => (
              <div className="col" key={item.id}>
                <ItemNew id={item.id} image={item.featuredImage} itemName={item.name} />
              </div>
            ))
          ) : (
            <p>No products found.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default SubcategoryPage;