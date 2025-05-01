import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Slider from "react-slick";
import ItemNew from '../../Components/ItemNew/ItemNew';
import './RelatedProducts.css';
import { fetchAllProducts } from '../../Services/api'; // make sure this is correct
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const RelatedProducts = () => {
  const { productId } = useParams();
  const [products, setProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const all = await fetchAllProducts();
        setProducts(all);

        const found = all.find(p => p._id === productId);
        setCurrentProduct(found);

        if (found?.subCategoryId?._id) {
          const related = all.filter(
            p => p._id !== found._id && p.subCategoryId?._id === found.subCategoryId._id
          );
          setRelatedProducts(related);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, [productId]);

  if (!currentProduct) {
    return <p>Product not found.</p>;
  }

  const slidesToShow = Math.min(relatedProducts.length, 4);
  const sliderSettings = {
    dots: false,
    infinite: relatedProducts.length > 1,
    speed: 200,
    slidesToShow,
    slidesToScroll: 1,
    arrows: true,
    variableWidth: relatedProducts.length === 1,
    responsive: [
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          arrows: false,
          dots: true,
        },
      },
    ],
  };

  return (
    <section className='related-product-section section-padding'>
      <div className="container">
        <section className="related-products-section">
          <h3>Related Products</h3>
          {relatedProducts.length > 0 ? (
            <div className="slider-container responsive" id="relatedProduct-sliderContainer">
              <Slider {...sliderSettings}>
                {relatedProducts.map(product => (
                  <ItemNew
                    id={product._id}
                    key={product._id}
                    image={`${API_BASE_URL}/uploads/featured/${product.featuredImage}`}
                    itemName={product.name}
                  />
                ))}
              </Slider>
            </div>
          ) : (
            <p>No related products available at the moment.</p>
          )}
        </section>
      </div>
    </section>
  );
};

export default RelatedProducts;