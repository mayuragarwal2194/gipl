import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import './Sidebar.css';

const Sidebar = () => {
  const [isProductOpen, setIsProductOpen] = useState(false);
  const [isBlogOpen, setIsBlogOpen] = useState(false);

  const toggleProductMenu = () => {
    setIsProductOpen(!isProductOpen);
  };

  const toggleBlogMenu = () => {
    setIsBlogOpen(!isBlogOpen);
  };

  return (
    <div
      className="sidebar d-flex flex-column bg-dark text-white p-3"
      style={{ height: '100vh', width: '250px', position: 'fixed' }}
    >
      <h4 className="text-center mb-4">Admin Dashboard</h4>
      <div className="list-group mb-3">

        <NavLink 
          to="/dashboard/job-applications" 
          className={({ isActive }) => `list-group-item list-group-item-action ${isActive ? 'active' : ''}`}
        >
          Job Applications
        </NavLink>

        <NavLink 
          to="/dashboard/subscribers" 
          className={({ isActive }) => `list-group-item list-group-item-action ${isActive ? 'active' : ''}`}
        >
          Subscribers
        </NavLink>

        <NavLink 
          to="/dashboard/quotes" 
          className={({ isActive }) => `list-group-item list-group-item-action ${isActive ? 'active' : ''}`}
        >
          Enquiry
        </NavLink>

        {/* Product main tab */}
        <div
          onClick={toggleProductMenu}
          className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
          style={{ cursor: 'pointer' }}
        >
          Products
          <span>{isProductOpen ? '▾' : '▸'}</span>
        </div>

        {isProductOpen && (
          <>
            <NavLink
              to="/dashboard/addproducts"
              className={({ isActive }) =>
                `list-group-item list-group-item-action ps-5 ${isActive ? 'active' : ''}`
              }
            >
              Add Products
            </NavLink>
            <NavLink
              to="/dashboard/viewproducts"
              className={({ isActive }) =>
                `list-group-item list-group-item-action ps-5 ${isActive ? 'active' : ''}`
              }
            >
              View Products
            </NavLink>
          </>
        )}

        {/* Blog main tab */}
        <div
          onClick={toggleBlogMenu}
          className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
          style={{ cursor: 'pointer' }}
        >
          Blogs
          <span>{isBlogOpen ? '▾' : '▸'}</span>
        </div>

        {isBlogOpen && (
          <>
            <NavLink
              to="/dashboard/addblogs"
              className={({ isActive }) =>
                `list-group-item list-group-item-action ps-5 ${isActive ? 'active' : ''}`
              }
            >
              Add Blog
            </NavLink>
            <NavLink
              to="/dashboard/viewblogs"
              className={({ isActive }) =>
                `list-group-item list-group-item-action ps-5 ${isActive ? 'active' : ''}`
              }
            >
              View Blogs
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;