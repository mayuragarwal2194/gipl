import React from 'react'
import './Announcement.css'
import { Link } from 'react-router-dom'

const Announcement = () => {
  return (
    <>
      <div className="announcement-section announcement-section-desktop">
        <div className="announcement-bg bg-black w-100 py-3">
          <div className="px-3 px-lg-5">
            <div className="text-white d-flex align-items-center justify-content-between text-uppercase">
              <div className="d-md-flex align-items-center gap-3">
                <div className="announcement"> Email: enquiry.gajpati@gmail.com</div>
                <div>
                  Tel: +91 95712 99666
                </div>
              </div>
              <Link
                to={'/product'}
                className="announcement-btn text-decoration-none text-white"
                role="button"
              >
                Explore Now
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="announcement-section announcement-section-mobile">
        <div className="announcement-bg bg-black w-100 py-3">
          <div className="px-3 px-lg-5">
            <div className="text-white text-center text-uppercase">
              <Link
                to={'/product'}
                className="announcement-btn text-decoration-none text-white"
                role="button"
              >
                Explore Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Announcement