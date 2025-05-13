import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "./BestProducts.css";
import ItemNew from "../ItemNew/ItemNew";
import { API_BASE_URL, fetchAllProducts } from "../../Services/api";

const BestProducts = () => {
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const sliderRef = useRef(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchAllProducts();

        // Filter out products whose parentCategory shortname is "uncategorized"
        const filtered = data.filter(
          (p) =>
            p.subCategoryId?.parentCategory?.shortname &&
            p.subCategoryId.parentCategory.shortname.toLowerCase() !== "uncategorized"
        );

        setProducts(filtered);

        if (filtered.length > 0) {
          const firstShortname = filtered[0].subCategoryId?.parentCategory?.shortname;
          setActiveTab(firstShortname);
        }
      } catch (err) {
        setError("Failed to fetch products.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(0);
    }
  }, [activeTab]);

  const handleTabClick = (tabShortname) => {
    setActiveTab(tabShortname);
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 200,
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: true,
    accessibility: false,
    responsive: [
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          arrows: false,
          dots: true,
          speed: 200,
        },
      },
    ],
  };

  const groupedByCategory = products.reduce((acc, product) => {
    const catShortname = product.subCategoryId?.parentCategory?.shortname;
    if (!catShortname || catShortname.toLowerCase() === "uncategorized") return acc;
    if (!acc[catShortname]) acc[catShortname] = [];
    acc[catShortname].push(product);
    return acc;
  }, {});

  const productsToDisplay = groupedByCategory[activeTab] || [];
  // console.log(productsToDisplay);
  
  return (
    <section className="best-section section-padding text-center theme-bg">
      <div className="section-header">
        <h6 className="section-subhead">Our Best Sellers</h6>
      </div>
      <div className="section-body">
        <div className="container">
          {loading ? (
            <p>Loading products...</p>
          ) : error ? (
            <p className="text-danger">{error}</p>
          ) : (
            <>
              <div className="best-tabs d-flex align-items-center justify-content-center letter-5">
                {Object.keys(groupedByCategory).map((shortname) => (
                  <h3
                    key={shortname}
                    className={`best-tab fw-normal cursor-pointer text-uppercase user-select-none ${activeTab === shortname ? "active" : ""
                      }`}
                    onClick={() => handleTabClick(shortname)}
                  >
                    {shortname}
                  </h3>
                ))}
              </div>

              <div className="slider-container responsive" id="best-sliderContainer">
                <Slider {...settings} ref={sliderRef}>
                  {productsToDisplay.map((product) => (
                    <ItemNew
                      key={product._id}
                      id={product._id}
                      image={`${API_BASE_URL}/uploads/featured/${product.featuredImage}`}
                      itemName={product.name}
                      isSubcategory={false}
                    />
                  ))}
                </Slider>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default BestProducts;
