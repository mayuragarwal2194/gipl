import React from 'react'
import './Hero.css'
import Slider from 'react-slick';

const Hero = () => {

  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    speed:1000 ,
    pauseOnHover: false
  };

  return (
    <>
      <section className="hero-section position-relative">
        <Slider {...settings}>
          <img src="/images/hero2.webp" alt="Slide 1" fetchpriority="high" />
          <img src="/images/hero1.webp" alt="Slide 2" />
          {/* <img src="/images/hero3.jpg" alt="Slide 3" /> */}
        </Slider>
      </section>
    </>
  )
}

export default Hero