import React, { useState } from 'react'
import './Career.css'
import BtnFillBlack from '../../Components/Buttons/BtnFillBlack/BtnFillBlack';
import CareerForm from './CareerForm/CareerForm';

const Career = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleLoadedData = () => {
    setIsLoading(false);
  };

  const handlePlayPauseButtonClick = () => {
    const videoElement = document.getElementById('video-banner');
    if (videoElement) {
      if (isPlaying) {
        videoElement.pause();
      } else {
        videoElement.play();
      }
      setIsPlaying(!isPlaying); // Toggle play/pause state
    }
  };
  return (
    <>
      <div className="career-page">
        <section className='career-hero-section section-padding'>
          <div className="container">
            <div className="d-lg-flex gap-5 align-items-center">
              <div className="w-lg-50 d-flex flex-column justify-content-between gap-4">
                <h4 className="career-head text-uppercase fw-normal letter-32 line-height-24">
                  Join the team
                </h4>
                <p className='career-description w-100 mb-0 pe-lg-3'>
                  GIPL (Gajpati Industry Pvt Ltd) is an employee-centered company that values autonomy, growth, and innovation. We believe that empowered employees drive success, so we foster a culture where creativity, independent thinking, and efficiency thrive. By providing a supportive work environment, we enable our team to take ownership of their work and make meaningful contributions.
                </p>
                <p className='career-description pe-lg-3'>
                  We actively support self-development and career advancement, providing opportunities to learn and grow. Our development team is always looking for talented individuals who thrive in a collaborative and excellence-driven environment.
                </p>
                <p className='career-description mb-0'>Navigate below to see our current open positions!</p>
                {/* <button className='ff-btn ff-btn-fill-dark text-capitalize text-decoration-none d-inline-block w-fit-content'>
                  <span className=''>Open Options</span>
                  <i className="fa-solid fa-arrow-down ms-2"></i>
                </button> */}
                <BtnFillBlack btn_name={'See Options'} link={'/about'} />
              </div>
              <div className="w-lg-50 d-lg-flex mt-5 mt-lg-0">
                <div className="career-video position-relative">
                  {isLoading && (
                    <div className="loading-spinner position-absolute top-50 start-50 translate-middle">
                      <p>Loading...</p>
                    </div>
                  )}
                  <video
                    id="video-banner"
                    width="100%"
                    height="100%"
                    className="object-cover rounded-circle"
                    // autoPlay
                    loop
                    playsInline
                    muted
                    // controls
                    preload="metadata"
                    poster="/videos/my-video-poster.jpg" // Ensure you have a poster image in the same folder
                    onLoadedData={handleLoadedData}
                  >
                    <source
                      src="/videos/myVideo.mp4#t=0.5"
                      type="video/mp4"
                    />
                  </video>
                  {/* Custom Play Button */}
                  <div
                    className="custom-play-btn position-absolute top-50 start-50 translate-middle d-none d-lg-inline-block"
                    onClick={handlePlayPauseButtonClick}
                    style={{ cursor: 'pointer' }}
                  >
                    {isPlaying ? (
                      <div className="pause-icon bg-white d-flex align-items-center justify-content-center rounded-circle">
                        <i className="ri-pause-large-line fe-bold"></i>
                      </div>
                    ) : (
                      <svg
                        width="50"
                        height="50"
                        viewBox="0 0 70 70"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M70 35C70 54.3302 54.3302 70 35 70C15.6698 70 0 54.3302 0 35C0 15.6698 15.6698 0 35 0C54.3302 0 70 15.6698 70 35ZM43.75 35L30.625 25.375V44.625L43.75 35Z"
                          fill="white"
                        />
                      </svg>
                    )}
                  </div>
                </div>
                <div className="career-top-bg user-select-none">
                  <img src="/images/career-top-bg.png" alt="" />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className='great-place-section section-padding'>
          <div className="container">
            <div className="section-header text-center">
              <h3 className="section-head w-lg-50 m-auto">
                What make Visioncraft a great place to work?
              </h3>
            </div>
            <div className="great-place-section-cards">
              <div className="row row-cols-1 row-cols-md-3 row-cols-md-4 g-4">
                <div className="col">
                  <div className="card h-100 border-0 bg-transparent custom-blog-card">
                    <div className="blog-image">
                      <img
                        src="/images/great-place-1.png"
                        className="article-image w-100 h-100 object-cover"
                        alt="Blog_Image"
                      />
                    </div>
                    <div className="card-body px-0 pb-0 mt-3">
                      <h5 className="blog-title fw-normal mb-3 text-capitalize">
                        Company Values
                      </h5>
                      <p className='career-description'>
                        Trust, learning, honesty, and co-operation are the pillars that sit at the core of what we do.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="card h-100 border-0 bg-transparent custom-blog-card">
                    <div className="blog-image">
                      <img
                        src="/images/great-place-2.png"
                        className="article-image w-100 h-100 object-cover"
                        alt="Blog_Image"
                      />
                    </div>
                    <div className="card-body px-0 pb-0 mt-3">
                      <h5 className="blog-title fw-normal mb-3 text-capitalize">
                        Friendly Atmosphere
                      </h5>
                      <p className='career-description'>
                        We hold a positive attitude in order to foster respect and decency for our entire team.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="card h-100 border-0 bg-transparent custom-blog-card">
                    <div className="blog-image">
                      <img
                        src="/images/great-place-3.png"
                        className="article-image w-100 h-100 object-cover"
                        alt="Blog_Image"
                      />
                    </div>
                    <div className="card-body px-0 pb-0 mt-3">
                      <h5 className="blog-title fw-normal mb-3 text-capitalize">
                        Work Life Balance
                      </h5>
                      <p className='career-description'>
                        For us, a healthy personal life is just as important as the time you spend in the office.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="card h-100 border-0 bg-transparent custom-blog-card">
                    <div className="blog-image">
                      <img
                        src="/images/great-place-4.png"
                        className="article-image w-100 h-100 object-cover"
                        alt="Blog_Image"
                      />
                    </div>
                    <div className="card-body px-0 pb-0 mt-3">
                      <h5 className="blog-title fw-normal mb-3 text-capitalize">
                        Everyday Grow
                      </h5>
                      <p className='career-description'>
                        We provide the necessary support to ensure your skills never stop growing.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className='career-form-section section-padding'>
          <div className="container">
            <div className="section-header text-center">
              <h3 className="section-head">
                Submit Your Info Here
              </h3>
            </div>
            <CareerForm />
          </div>
        </section>
      </div>
    </>
  )
}

export default Career