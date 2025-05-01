import React, { useState, useEffect } from "react";
import { fetchAllProducts } from "../../Services/api";
import ItemNew from "../../Components/ItemNew/ItemNew";
import './Product.css';

const Product = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSubCategory, setSelectedSubCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchAllProducts();
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products", err);
      }
    };
    getProducts();
  }, []);

  // Dynamic Category and Subcategory Extraction
  const categories = ["All", ...new Set(
    products
      .map((p) => p.subCategoryId?.parentCategory?.shortname)
      .filter(Boolean)
  )];

  const subCategories =
    selectedCategory !== "All"
      ? ["All", ...new Set(
        products
          .filter((p) =>
            p.subCategoryId?.parentCategory?.shortname === selectedCategory
          )
          .map((p) => p.subCategoryId?.name)
          .filter(Boolean)
      )]
      : ["All"];

  // Filter Logic
  const filteredProducts = products
    .filter((p) =>
      selectedCategory === "All"
        ? true
        : p.subCategoryId?.parentCategory?.shortname === selectedCategory
    )
    .filter((p) =>
      selectedSubCategory === "All"
        ? true
        : p.subCategoryId?.name === selectedSubCategory
    )
    .filter((p) =>
      searchQuery
        ? p.name.toLowerCase().includes(searchQuery.toLowerCase())
        : true
    );

  const resetFilters = () => {
    setSelectedCategory("All");
    setSelectedSubCategory("All");
    setSearchQuery("");
  };

  return (
    <section className="w-100 section-padding allProduct-page">
      <div className="px-12 px-lg-5">
        <div className="d-lg-flex">
          {/* Sidebar Filters */}
          <aside className="w-25 pe-4 sticky-sidebar d-none d-lg-block">
            <h5>Filters</h5>

            {/* Category Filter */}
            <div className="mb-3">
              <label htmlFor="category" className="form-label">Category</label>
              <select
                id="category"
                className="form-select"
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setSelectedSubCategory("All");
                }}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Subcategory Filter */}
            {selectedCategory !== "All" && (
              <div className="mb-3">
                <label htmlFor="subCategory" className="form-label">Subcategory</label>
                <select
                  id="subCategory"
                  className="form-select"
                  value={selectedSubCategory}
                  onChange={(e) => setSelectedSubCategory(e.target.value)}
                >
                  {subCategories.map((sub) => (
                    <option key={sub} value={sub}>
                      {sub}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Search Filter */}
            <div className="mb-3">
              <label htmlFor="search" className="form-label">Search</label>
              <input
                type="text"
                id="search"
                className="form-control"
                placeholder="Search products"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="mt-4">
              <button className="btn btn-secondary w-100" onClick={resetFilters}>
                Reset Filters
              </button>
            </div>
          </aside>

          {/* Mobile Filter Button */}
          <button
            className="mobile-filter-btn btn bg-transparent border d-flex align-items-center gap-2 d-lg-none mb-4"
            data-bs-toggle="modal"
            data-bs-target="#mobileFilterModal"
          >
            Filter <i className="ri-equalizer-3-line"></i>
          </button>

          {/* Mobile Filter Modal */}
          <div
            className="modal fade"
            id="mobileFilterModal"
            tabIndex="-1"
            aria-labelledby="mobileFilterModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="mobileFilterModalLabel">Filters</h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  {/* Category */}
                  <div className="mb-3">
                    <label htmlFor="mobile-category" className="form-label">Category</label>
                    <select
                      id="mobile-category"
                      className="form-select"
                      value={selectedCategory}
                      onChange={(e) => {
                        setSelectedCategory(e.target.value);
                        setSelectedSubCategory("All");
                      }}
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Subcategory */}
                  {selectedCategory !== "All" && (
                    <div className="mb-3">
                      <label htmlFor="mobile-subCategory" className="form-label">Subcategory</label>
                      <select
                        id="mobile-subCategory"
                        className="form-select"
                        value={selectedSubCategory}
                        onChange={(e) => setSelectedSubCategory(e.target.value)}
                      >
                        {subCategories.map((sub) => (
                          <option key={sub} value={sub}>
                            {sub}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Search */}
                  <div className="mb-3">
                    <label htmlFor="mobile-search" className="form-label">Search</label>
                    <input
                      type="text"
                      id="mobile-search"
                      className="form-control"
                      placeholder="Search products"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={resetFilters}
                  >
                    Reset Filters
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-bs-dismiss="modal"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Product Display */}
          <main className="product-display-main w-75">
            <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-4">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((item) => (
                  <div className="col" key={item._id}>
                    <ItemNew
                      id={item._id}
                      image={`http://localhost:5000/uploads/featured/${item.featuredImage}`}
                      itemName={item.name}
                    />
                  </div>
                ))
              ) : (
                <p>No products found.</p>
              )}
            </div>
          </main>
        </div>
      </div>
    </section>
  );
};

export default Product;