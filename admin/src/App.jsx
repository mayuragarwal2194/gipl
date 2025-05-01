import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./utils/ProtectedRoute";
import Login from "./pages/Login";
import DashboardLayout from "./components/DashboardLayout/DashboardLayout";
import JobApplications from "./components/JobApplications/JobApplications";
import Subscribers from "./components/Subscribers/Subscribers";
import Quotes from "./components/Quotes/Quotes";
import ViewProducts from "./components/ViewProducts/ViewProducts";
import AddProducts from "./components/Products/AddProducts/AddProducts";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import AddBlogs from "./components/Blog/AddBlogs/AddBlogs";
import ViewBlogs from "./components/Blog/ViewBlogs/ViewBlogs";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      {/* Parent route with wildcard `/*` for nested routes */}
      <Route
        path="/dashboard/*"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        {/* Nested routes inside Dashboard */}
        <Route path="job-applications" element={<JobApplications />} />
        <Route path="subscribers" element={<Subscribers />} />
        <Route path="quotes" element={<Quotes />} />
        <Route path="viewproducts" element={<ViewProducts />} />
        <Route path="addproducts" element={<AddProducts />} />
        <Route path="edit-product/:productId" element={<AddProducts />} />
        <Route path="product/:product_id" element={<ProductDetail />} />
        <Route path="addblogs" element={<AddBlogs />} />
        <Route path="viewblogs" element={<ViewBlogs />} />
      </Route>

    </Routes>
  );
}

export default App;