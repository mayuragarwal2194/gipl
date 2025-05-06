import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchProductById, API_BASE_URL } from "../../services/api";
import Swal from "sweetalert2";
import "./ProductDetail.css";

const ProductDetail = () => {
  const { product_id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetchProductById(product_id);
        setProduct(res);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Failed to load product",
          text: error.message || "Something went wrong.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [product_id]);

  if (loading) return <div className="container mt-5">Loading...</div>;
  if (!product) return <div className="container mt-5">Product not found</div>;

  const getBannerImageUrl = () =>
    product.bannerImage ? `${API_BASE_URL}/uploads/banner/${product.bannerImage}` : "/default-banner.jpg";

  const getAboutImageUrl = (filename) =>
    filename ? `${API_BASE_URL}/uploads/subproducts/about/${filename}` : "";

  return (
    <div className="product-detail">
      <button
        className="btn btn-secondary mb-3"
        onClick={() => navigate("/dashboard/viewproducts")}
      >
        ← Back to Products
      </button>

      <div
        className="product-header position-relative"
        style={{
          backgroundImage: `url(${getBannerImageUrl()})`,
        }}
      >
        <div className="detail-banner-overlay w-100 h-100 px-lg-5 d-flex align-items-center justify-content-center">
          <h1 className="position-absolute text-white text-capitalize">{product.name}</h1>
        </div>
      </div>

      <div className="container product-detail-section section-padding">
        {product.subProducts?.length > 0 && (
          <div className="subproducts">
            {product.subProducts.map((variant, idx) => (
              <div key={variant.name} className="subproduct mb-5">
                <div
                  className={`about-subproduct d-flex flex-column flex-lg-row align-items-center gap-4 ${idx % 2 !== 0 ? "flex-lg-row-reverse" : ""
                    }`}
                >
                  <div className="product-about-image w-50">
                    {variant.aboutImage ? (
                      <img
                        src={getAboutImageUrl(variant.aboutImage)}
                        className="w-100 h-100 rounded"
                        alt={variant.name}
                      />
                    ) : (
                      <div className="w-100 h-100 rounded bg-light d-flex align-items-center justify-content-center">
                        <span className="text-muted">No Image Available</span>
                      </div>
                    )}
                  </div>
                  <div className="subproduct-description w-50">
                    <h2 className="subproduct-name">{variant.name}</h2>
                    {variant.description?.map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>
                </div>

                <div className="d-lg-flex align-items-start gap-5 py-lg-5">
                  <div className="special-features w-50">
                    <h1>Special Features</h1>
                    <ul className="special-features-list ps-0 list-unstyled">
                      {variant.specialFeatures?.map((item, i) => (
                        <li key={i} className="mb-2 position-relative ps-4">{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="applications w-50">
                    <h1>Applications</h1>
                    <ul className="special-features-list ps-0 list-unstyled">
                      {variant.applications?.map((item, i) => (
                        <li key={i} className="mb-2 position-relative ps-4">{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
