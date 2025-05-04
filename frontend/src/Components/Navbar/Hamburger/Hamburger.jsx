import React, { useState } from 'react';
import './Hamburger.css';
import { Link } from 'react-router-dom';

const Hamburger = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);

    if (!isOpen) {
      document.body.classList.add('no-scroll'); // Disable body scroll
    } else {
      document.body.classList.remove('no-scroll'); // Enable body scroll
    }
  };

  const closeMenu = () => {
    setIsOpen(false);
    document.body.classList.remove('no-scroll'); // Re-enable body scroll
  };

  return (
    <>
      <div className="hamburger d-lg-none flex-1">
        <div className="hamburger-icon" onClick={toggleMenu}>
          <svg
            aria-hidden="true"
            focusable="false"
            role="presentation"
            className="icon icon-hamburger hamburger-icon"
            viewBox="0 0 64 64"
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
          >
            <title>icon-hamburger</title>
            <path
              d="M7 15h51M7 32h43M7 49h51"
              stroke="currentColor"
              fill="none"
              strokeWidth="3"
            />
          </svg>
        </div>
        <div className={`hamburger-menu ${isOpen ? 'open' : ''}`}>
          <div className="border-bottom mb-3">
            <div className="container">
              <div className="hamburger-header d-flex align-items-center justify-content-center py-12">
                <div className="ham-store-logo-wrapper">
                  <Link to="/" aria-label="Visit Homepage" className="ham-store-logo d-block text-decoration-none" onClick={closeMenu}>
                    <img src="/images/logoBlack.png" className="w-100 h-100" alt="Store Logo" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <ul className='hamburger-navs list-unstyled px-12'>
            <li className='ps-0 py-2' onClick={closeMenu}>
              <Link to={'/'} className='text-decoration-none' onClick={closeMenu}>
                Home
              </Link>
            </li>
            <li className='ps-0 py-2'>
              <Link to={'/about'} className='text-decoration-none' onClick={closeMenu}>
                About
              </Link>
            </li>
            <li className='ps-0 py-2' onClick={closeMenu}>
              <Link to={'/product'} className='text-decoration-none' onClick={closeMenu}>
                Products
              </Link>
            </li>
            <li className='ps-0 py-2'>
              <Link to={'/contact'} className='text-decoration-none' onClick={closeMenu}>
                <span className="position-relative">Contact Us</span>
              </Link>
            </li>
            <li className='ps-0 py-2'>
              <Link to={'/blogs'} className='text-decoration-none' onClick={closeMenu}>
                <span className="position-relative">Blogs</span>
              </Link>
            </li>
            <li className='ps-0 py-2'>
              <Link to={'/careers'} className='text-decoration-none' onClick={closeMenu}>
                <span className="position-relative">Careers</span>
              </Link>
            </li>
          </ul>
        </div>
        <div className="hamburger-overlay" onClick={closeMenu}></div>
      </div>
    </>
  );
};

export default Hamburger;
