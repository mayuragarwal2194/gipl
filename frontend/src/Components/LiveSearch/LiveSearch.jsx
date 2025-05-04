import React, { useEffect, useState } from "react";
import ItemNew from "../../Components/ItemNew/ItemNew";
import { fetchAllProducts, API_BASE_URL } from "../../Services/api";

const LiveSearch = ({ onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchAllProducts(); // Expecting a flat array of product objects
        setAllProducts(data); // Set the full list
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  const filteredProducts = allProducts.filter((product) =>
    searchQuery
      ? product.name.toLowerCase().includes(searchQuery.toLowerCase())
      : false
  );

  const handleItemClick = () => {
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
            <div className="results-container row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
              {loading ? (
                <p>Loading products...</p>
              ) : searchQuery && filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <div key={product._id} onClick={handleItemClick}>
                    <ItemNew
                      key={product._id}
                      id={product._id}
                      image={`${API_BASE_URL}/uploads/featured/${product.featuredImage}`}
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