import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { deleteProduct, fetchProducts } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import ProductSearchBar from './ProductSearchBar/ProductSearchBar'; // <- Import search component

const ViewProducts = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
        setFilteredProducts(data); // Initial render = full list
      } catch (error) {
        setError('Failed to load products');
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  const handleDelete = async (e, productId) => {
    e.stopPropagation();
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteProduct(productId);
          const updated = products.filter((product) => product._id !== productId);
          setProducts(updated);
          setFilteredProducts(updated);
          Swal.fire('Deleted!', 'Product has been removed.', 'success');
        } catch (error) {
          Swal.fire('Error!', error.message || 'Failed to delete product', 'error');
        }
      }
    });
  };

  return (
    <div className="admin-container">
      <h2>View Products</h2>

      <ProductSearchBar allProducts={products} onSearchResults={setFilteredProducts} />

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <div className="error">{error}</div>
      ) : (
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>Sr no.</th>
              <th>Featured Image</th>
              <th>Product Name</th>
              <th>Subcategory</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length === 0 ? (
              <tr>
                <td colSpan="4">No products found</td>
              </tr>
            ) : (
              filteredProducts.map((product, index) => (
                <tr
                  key={product._id}
                  className="align-middle"
                  onClick={() => navigate(`/dashboard/product/${product._id}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <td>{index + 1}</td>
                  <td>
                    {product.featuredImage ? (
                      <img
                        src={`${import.meta.env.VITE_API_BASE_URL}/uploads/featured/${product.featuredImage}`}
                        alt={product.name}
                        style={{ width: '50px', height: 'auto', objectFit: 'cover' }}
                      />
                    ) : (
                      'No image'
                    )}
                  </td>
                  <td>{product.name}</td>
                  <td>{product.subCategoryId ? product.subCategoryId.name : 'No Subcategory'}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm me-3"
                      onClick={(e) => handleDelete(e, product._id)}
                    >
                      ❌ Delete
                    </button>
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/dashboard/edit-product/${product._id}`);
                      }}
                    >
                      ✏️ Edit
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewProducts;