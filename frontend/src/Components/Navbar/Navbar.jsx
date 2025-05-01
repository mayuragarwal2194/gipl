import React, { useEffect, useState } from 'react';
import './Navbar.css';
import { Link, useLocation } from 'react-router-dom';
import Hamburger from './Hamburger/Hamburger';
import LiveSearch from '../LiveSearch/LiveSearch';
import { getAllCategories } from '../../Services/api'; // <- Update path as needed

const Navbar = ({ isSticky }) => {
  const location = useLocation();
  const [categories, setCategories] = useState([]);
  const [menu, setMenu] = useState('');
  const [hoveredMenu, setHoveredMenu] = useState(null);
  const [activeSubCategory, setActiveSubCategory] = useState({});
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getAllCategories();
        const filtered = data.filter(cat => cat.name.toLowerCase() !== 'uncategorized');
        setCategories(filtered);
      } catch (error) {
        console.error('[ERROR] Failed to fetch categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleSubCategoryClick = (parentIndex, subIndex) => {
    setActiveSubCategory((prevState) => ({
      ...prevState,
      [parentIndex]: prevState[parentIndex] === subIndex ? null : subIndex,
    }));
  };

  const toggleSearchModal = () => {
    setIsSearchModalOpen(!isSearchModalOpen);
  };

  return (
    <>
      <div
        className={`navbar-section inside-banner ${location.pathname === '/' ? 'position-absolute' : 'position-relative'} ${location.pathname !== '/' && 'notHomeCss'} ${isSticky ? 'sticky' : ''}`}
      >
        <div className="px-12 px-lg-5">
          {/* Desktop Navigation */}
          <nav className="navbarnew d-none d-lg-flex align-items-center justify-content-between p-0">
            <div className="store-logo-wrapper flex-1">
              <Link to="/" className="store-logo d-block default-logo" aria-label="Visit FashionFusion Homepage">
                <img
                  src={`/images/${isSticky || location.pathname !== '/' ? 'logoBlack.png' : 'logoWhite.png'}`}
                  className="w-100 h-100"
                  alt="Logo"
                />
              </Link>
            </div>
            <ul className="desktop-menu letter-216 d-flex align-items-center list-unstyled mb-0">
              <li className="nav-item cursor-pointer position-relative">
                <Link to="/" className="text-decoration-none">
                  <span className="nav-item-span position-relative">Home</span>
                </Link>
              </li>
              <li className="nav-item cursor-pointer position-relative">
                <Link to="/about" className="text-decoration-none">
                  <span className="nav-item-span position-relative">About</span>
                </Link>
              </li>
              <li
                onMouseEnter={() => setHoveredMenu('products')}
                onMouseLeave={() => setHoveredMenu(null)}
                className={`nav-item cursor-pointer ${menu === 'products' ? 'active' : ''}`}
              >
                <Link to="/product" className="text-decoration-none">
                  <span
                    onClick={() => {
                      setMenu('products');
                      setHoveredMenu(null);
                    }}
                    className="text-capitalize"
                  >
                    Products
                  </span>
                </Link>
                <div
                  className="dropdown-content mega-menu px-lg-4"
                  style={{ display: hoveredMenu === 'products' ? 'block' : 'none' }}
                >
                  <div className="w-100 d-flex justify-content-start gap-5 max-h-400 flex-wrap">
                    {categories.map((category, parentIndex) => (
                      <div className="mega-navs w-fit-content" key={category._id}>
                        <h5 className="mega-nav px-0 text-uppercase parent-category fw-bold active mb-3">
                          {category.name}
                        </h5>
                        <div className="select-menu">
                          {category.children?.map((subCategory, subIndex) => (
                            <div key={subCategory._id} className="subcategory-nav-item">
                              <div
                                className="select py-2 d-flex justify-content-between align-items-center"
                                onClick={() => handleSubCategoryClick(parentIndex, subIndex)}
                              >
                                <span className="text-capitalize fw-semibold p-0">
                                  {subCategory.name}
                                </span>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className={`${activeSubCategory[parentIndex] === subIndex ? 'rotate' : ''}`}
                                  width="1em"
                                  height="1em"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1.5"
                                    d="m6 9l6 6l6-6"
                                  />
                                </svg>
                              </div>
                              <ul
                                className={`child-options-list list-unstyled ${activeSubCategory[parentIndex] === subIndex ? 'active' : ''
                                  }`}
                              >
                                {subCategory.children?.map((product) => (
                                  <li key={product._id} className="mb-1">
                                    <Link
                                      to={`/product/${product._id}`}
                                      className="mega-nav px-0 child-category fw-500 text-uppercase mb-2"
                                      onClick={() => setHoveredMenu(null)}
                                    >
                                      {product.name}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </li>
              <li className="nav-item cursor-pointer position-relative">
                <Link to="/contact" className="text-decoration-none">
                  <span className="nav-item-span position-relative">Contact Us</span>
                </Link>
              </li>
              <li className="nav-item cursor-pointer position-relative">
                <Link to="/blogs" className="text-decoration-none">
                  <span className="nav-item-span position-relative">Blogs</span>
                </Link>
              </li>
              <li className="nav-item cursor-pointer position-relative">
                <Link to="/careers" className="text-decoration-none">
                  <span className="nav-item-span position-relative">Careers</span>
                </Link>
              </li>
            </ul>
          </nav>

          {/* Mobile Navigation */}
          <nav className="mobile-menu d-flex align-items-center d-lg-none py-12">
            <Hamburger />
            <div className="store-logo-wrapper">
              <Link to="/" className="store-logo d-block default-logo" aria-label="Visit FashionFusion Homepage">
                <img
                  src={`/images/${isSticky || location.pathname !== '/' ? 'logoBlack.png' : 'logoWhite.png'}`}
                  className="w-100 h-100"
                  alt="Logo"
                />
              </Link>
            </div>
            <ul className="nav-icons d-flex align-items-center justify-content-end list-unstyled mb-0 flex-1 gap-3">
              <li className="search-functionality" onClick={toggleSearchModal}>
                <i className="ri-search-line"></i>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {isSearchModalOpen && <LiveSearch onClose={toggleSearchModal} />}
    </>
  );
};

export default Navbar;