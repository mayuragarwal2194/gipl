import React from 'react'
import './AboutSection.css'
import BtnFillBlack from '../Buttons/BtnFillBlack/BtnFillBlack'

const AboutSection = () => {
  return (
    <>
      <section className="about-section w-100 section-padding theme-bg">
        <div className="container">
          <div className="row about-row align-items-center justify-content-center">
            <div className="col-12 col-lg-5">
              <div className="about-left d-flex flex-column gap-3 gap-lg-4">
                <h6 className="about-subhead text-uppercase mb-0">About GIPL</h6>
                <h4 className="about-head text-uppercase fw-normal letter-32 line-height-24 mb-0">
                  One-Stop Shop for All Types of Construction Solutions
                </h4>
                <p className="about-description mb-0">
                  GIPL is a trusted name in road construction and infrastructure development across India. We specialize in advanced materials like Polymer Modified Bitumen (PMB), CRMB, and high-performance bitumen emulsions.
                </p>
                <p className='about-description mb-0'>
                  As experienced highway construction contractors, GIPL ensures quality, durability, and timely project delivery. From pothole repair solutions to large-scale highway execution, we deliver engineered results for demanding environments.
                </p>
                <BtnFillBlack btn_name={'Discover'} link={'/about'} />
              </div>
            </div>
            <div className="col-12 col-lg-7">
              <div className="about-images d-flex" id='aboutImage'>
                <div
                  className="about-image-small flex-shrink-0"
                  style={{ backgroundImage: 'url(images/about-section1.jpg)' }}
                >
                  {/* <img
                  src="./images/about-small.webp"
                  className="img-fluid"
                  alt=""
                /> */}
                </div>
                <div className="about-image-big flex-shrink-0">
                  <img src="images/hero1.webp" className="img-fluid" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default AboutSection