// Contact.jsx
import React from 'react';
import Slider from 'react-slick';
import ContactForm from './ContactForm/ContactForm';
import './Contact.css'

const Contact = () => {
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
      {/* <div className="page-banner contact-hero-banner">
        <Slider {...settings}>
          <img src="/images/contact-banner2.jpg" className="w-100 object-fit-cover" alt="Slide 1" />
        </Slider>
      </div> */}
      <section className="w-100 section-padding">
        <div className="container">
          <div className="section-header text-center">
            <h3 className="section-head">
              Contact Us
            </h3>
          </div>
          <div className="con-wrapper d-flex align-items-center">
            <div className="contact-left w-50">
              {/* <div className="section-header">
                <h3 className="section-head">
                  Contact Us
                </h3>
              </div> */}
              <div>
                <ul className='list-unstyled'>
                  <li className='mb-4'>
                    <div className='d-flex align-items-center gap-2'>
                      <i className="ri-phone-line"></i>
                      <h4 className='mb-0'>Call Us</h4>
                    </div>
                    <div>(+91) 9571299666</div>
                  </li>
                  <li className='mb-4'>
                    <div className='d-flex align-items-center gap-2'>
                      <i className="ri-map-pin-line"></i>
                      <h4 className='mb-0'>Location</h4>
                    </div>
                    <div className='con-address w-60'>
                      <span><strong>Corporate Address</strong> : Gajpati Industries Pvt. Ltd.
                        Near Power Grid, SIDCO IGC Phase III, Samba, Jammu, J&K,
                        184121
                      </span>
                    </div>
                  </li>
                  <li className='mb-4'>
                    <div className='d-flex align-items-center gap-2'>
                      <i className="ri-time-line"></i>
                      <h4 className='mb-0'>Business Hours</h4>
                    </div>
                    <div className='w-60'>
                      Mon-Fri.......9am-6.30pm,
                      <div>Sat,Sun.......Closed</div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="contact-right w-50 border-start ps-lg-5">
              <ContactForm submitButtonText="Send Message" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;