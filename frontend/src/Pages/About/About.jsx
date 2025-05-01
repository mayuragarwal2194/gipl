import React from 'react'
import SlickSlider from '../../Components/SlickSlider/SlickSlider'
import './About.css'
import Slider from 'react-slick'
import VideoSection from '../../Components/VideoSection/VideoSection'

const About = () => {

  const settings = {
    dots: false,
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      <section className='about-hero-section w-100'>
        <div className="page-banner about-hero-banner">
          <Slider {...settings}>
            <img src="/images/buldoger.jpg" className='w-100 object-fit-cover' alt="Slide 1" />
          </Slider>
        </div>
      </section>
      <section className='about-video-section w-100 section-padding theme-bg'>
        <div className="container">
          <div className="section-header text-center">
            <h3 className="section-head">Our Story</h3>
          </div>
          <div className="row about-row align-items-center justify-content-center">
            <div className="col-12 col-lg-4">
              <div className="about-left d-flex flex-column gap-3 gap-lg-4">
                <h6 className="about-subhead text-uppercase mb-0">Company Overview</h6>
                <h4 className="about-head text-uppercase fw-normal letter-32 line-height-24 mb-0">
                  Committed to Innovation and Excellence
                </h4>
                <p className="about-description mb-0">
                  GIPL is a one-stop shop for premium bitumen, admixtures, epoxy, sealants, and construction chemicals, committed to delivering innovative construction solutions with excellence and trusted expertise.
                </p>
              </div>
            </div>
            <div className="col-12 col-lg-8">
              <VideoSection />
            </div>
          </div>
        </div>
      </section>
      <section className="about-who-section w-100 section-padding theme-bg">
        <div className="container">
          <div className="row about-row align-items-center justify-content-center">
            <div className="col-12 col-lg-6">
              <img src="/images/about-fence.jpg" className='w-100' alt="" />
            </div>
            <div className="col-12 col-lg-6">
              <div className="about-left d-flex flex-column gap-3 gap-lg-4">
                <h6 className="about-subhead text-uppercase mb-0">Company Mission</h6>
                <h4 className="about-head text-uppercase fw-normal letter-32 line-height-24 mb-0">
                  Driving Growth Through Quality Infrastructure
                </h4>
                <p className="about-description mb-0">
                  At GIPL, our mission is to redefine industry standards as a top road construction company in India and reliable bitumen supplier. We aim to deliver sustainable infrastructure solutions, ensuring quality, innovation, and long-term value. Driven by excellence, we strive to support India's growth through superior engineering and construction practices.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='about-best-section w-100 section-padding theme-bg'>
        <div className="container">
          <div className="row about-row align-items-center justify-content-center">
            <div className="col-12 col-lg-7">
              <h6 className="about-subhead text-uppercase">Company Vision</h6>
              <h4 className="about-head text-uppercase fw-normal letter-32 line-height-24">
                A Global Leader in Construction Solutions
              </h4>
              <p className="about-description">
                At GIPL, our vision is to expand globally as a trusted name in construction solutions, bitumen supply, and road infrastructure. We aim to deliver quality, innovation, and sustainable growth, building lasting partnerships across industries and geographies.
              </p>

            </div>
            <div className="col-12 col-lg-5">
              <div className="about-left d-flex flex-column gap-3 gap-lg-4">
                <img src="/images/about-reverse.jpg" className='w-100' alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default About