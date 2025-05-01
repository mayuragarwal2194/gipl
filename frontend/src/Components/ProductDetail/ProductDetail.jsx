import React, { useEffect, useState } from 'react';
import './ProductDetail.css';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../../Services/api';
import ContactForm from '../../Pages/Contact/ContactForm/ContactForm';
import RelatedProducts from '../RelatedProducts/RelatedProducts';

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const data = await fetchProductById(productId);
        setProduct(data);
      } catch (err) {
        setError('Product not found.');
      } finally {
        setLoading(false);
      }
    };

    getProduct();
  }, [productId]);

  if (loading) return <div>Loading...</div>;
  if (error || !product) return <div>{error || 'Product not found.'}</div>;

  return (
    <div className="product-detail">
      <div
        className="product-header position-relative"
        style={{
          backgroundImage: `url(http://localhost:5000/uploads/banner/${product.bannerImage || 'default-banner.jpg'})`,
        }}
      >
        <div className="detail-banner-overlay w-100 h-100 px-lg-5 d-flex align-items-center justify-content-center">
          <h1 className="position-absolute text-white text-capitalize">{product.name}</h1>
        </div>
      </div>

      <div className="product-detail-section section-padding">
        <div className="container">
          {product.subProducts && product.subProducts.length > 0 && (
            <div className="subproducts">
              {product.subProducts.map((subProduct, idx) => (
                <div key={subProduct.name} className="subproduct">
                  <div
                    className={`about-subproduct d-flex align-items-center gap-5 ${idx % 2 === 0 ? '' : 'flex-row-reverse'}`}
                  >
                    <div className='product-about-image w-50'>
                      <img src={`http://localhost:5000/uploads/subProducts/about/${subProduct.aboutImage}`} className='w-100 h-100 rounded' alt="" />
                    </div>
                    <div className="subproduct-description w-50">
                      <h1 className='subproduct-name'>{subProduct.name}</h1>
                      <div>
                        {subProduct.description.map((paragraph, idx) => (
                          <p key={idx}>{paragraph}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="d-lg-flex align-items-start gap-5 py-lg-5">
                    <div className='special-features w-50'>
                      <h1 className='special-features-head mb-3'>Special Features</h1>
                      <ul className="special-features-list ps-0 list-unstyled">
                        {subProduct.specialFeatures.map((feature, idx) => (
                          <li key={idx} className="mb-2 position-relative ps-4">
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    {subProduct.applications && (
                      <div className='special-features w-50'>
                        <h1 className='special-features-head mb-3'>Applications</h1>
                        <ul className="special-features-list ps-0 list-unstyled">
                          {subProduct.applications.map((application, idx) => (
                            <li key={idx} className="mb-2 position-relative ps-4">
                              {application}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>

      <RelatedProducts />

      <section className="w-100 section-padding">
        <div className="section-header text-center">
          <h3 className="section-head">Get a Quote</h3>
        </div>
        <div className="w-lg-50 m-auto">
          <ContactForm submitButtonText="Send Message" />
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;