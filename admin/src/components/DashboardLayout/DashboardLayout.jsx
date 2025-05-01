import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutAdmin } from "../../services/api";
import { Outlet } from 'react-router-dom'; // This will render the specific content based on the route
import Sidebar from '../Sidebar/SIdebar';

const DashboardLayout = () => {
  const navigate = useNavigate();

  // Handle logout logic
  const handleLogout = async () => {
    const result = await logoutAdmin();
    if (result.success) {
      navigate("/", { replace: true });
    }
  };

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div className="content" style={{ marginLeft: "250px", padding: "20px", width: "100%" }}>
        <div className='w-100 text-end mb-3'>
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;