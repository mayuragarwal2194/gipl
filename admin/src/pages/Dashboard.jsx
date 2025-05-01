import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout/DashboardLayout';
import JobApplications from '../components/JobApplications/JobApplications';
import AdminSubscribers from '../components/Subscribers/Subscribers';
import Quotes from '../components/Quotes/Quotes';
import ViewProducts from '../components/ViewProducts/ViewProducts';
import AddProducts from '../components/Products/AddProducts/AddProducts';
import AddBlogs from '../components/Blog/AddBlogs/AddBlogs';
import ViewBlogs from '../components/Blog/ViewBlogs/ViewBlogs';

const Dashboard = () => {
  return (
    <Routes>
      {/* Dashboard Layout */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        {/* Define the child routes */}
        <Route path="job-applications" element={<JobApplications />} />
        <Route path="subscribers" element={<AdminSubscribers />} />
        <Route path="quotes" element={<Quotes />} />
        <Route path="viewproducts" element={<ViewProducts />} />
        <Route path="addproducts" element={<AddProducts />} />
        <Route path="addblogs" element={<AddBlogs />} />
        <Route path="viewblogs" element={<ViewBlogs />} />
      </Route>
    </Routes>
  );
};

export default Dashboard;