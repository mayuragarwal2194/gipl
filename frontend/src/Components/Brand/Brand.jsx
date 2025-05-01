import React from 'react'
import './Brand.css'
import Slider from 'react-slick'

const Brand = () => {
  var settings = {
    arrows: false,
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3
  };
  return (
    <>
      <section className="brand-section w-100 section-padding text-center bg-black">
        <div className="container">
          <div className="section-header">
            <h6 className="section-subhead">Brands</h6>
            <h3 className="section-head text-uppercase">
              Hey, we've cultivated long-term relationships with our brand and companies And has set a new standard in the industry.
            </h3>
          </div>
          <div className="section-body">
            <slider-container id="brand-sliderContainer">
              <div className="slider-container m-auto">
                <Slider {...settings}>
                  <div className="slide">
                    <div className="brand-image">
                      <img
                        src="images/brand-es.png"
                        className="w-100 h-100 object-cover"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="slide">
                    <div className="brand-image">
                      <img
                        src="images/brand-eq.png"
                        className="w-100 h-100 object-cover"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="slide">
                    <div className="brand-image">
                      <img
                        src="images/brand-eq.png"
                        className="w-100 h-100 object-cover"
                        alt=""
                      />
                    </div>
                  </div>
                </Slider>
              </div>
            </slider-container>
          </div>
        </div>
      </section>
    </>
  )
}

export default Brand