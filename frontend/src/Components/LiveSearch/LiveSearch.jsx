import React, { useState } from "react";
import { products } from "../../Data/ProductData";
import ItemNew from "../../Components/ItemNew/ItemNew";

const LiveSearch = ({ onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter products based on search query
  const filteredProducts = products
    .flatMap((category) => category.subCategories || []) // Extract all subcategories
    .flatMap((subCategory) => subCategory.products || []) // Extract all products
    .filter((product) =>
      searchQuery
        ? product.name.toLowerCase().includes(searchQuery.toLowerCase())
        : false // Do not show any products if searchQuery is empty
    );

  const handleItemClick = () => {
    // Close the modal when an item is clicked
    onClose();
  };

  return (
    <div
      className="modal fade show"
      style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
      tabIndex="-1"
      role="dialog"
    >
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Search Products</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Search for products"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {/* Display Filtered Products */}
            <div className="results-container row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
              {searchQuery && filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    onClick={handleItemClick} // Close modal on item click
                  >
                    <ItemNew
                      id={product.id}
                      image={product.featuredImage}
                      itemName={product.name}
                    />
                  </div>
                ))
              ) : (
                searchQuery && (
                  <p className="no-results">No products match your search.</p>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveSearch;