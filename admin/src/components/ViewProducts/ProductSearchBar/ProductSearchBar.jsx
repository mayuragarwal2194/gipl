import React, { useState, useEffect } from 'react';

const ProductSearchBar = ({ allProducts, onSearchResults }) => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (!searchTerm.trim()) {
        onSearchResults(allProducts);
      } else {
        const filtered = allProducts.filter((product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        onSearchResults(filtered);
      }
    }, 300); // debounce time

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, allProducts, onSearchResults]);

  return (
    <div className="mb-3">
      <input
        type="text"
        className="form-control"
        id='searchbar'
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default ProductSearchBar;