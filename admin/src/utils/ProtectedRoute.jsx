import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { verifyAdmin } from "../services/api";

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const result = await verifyAdmin();
      setIsAuthenticated(result.authenticated);
    };
    checkAuth();
  }, []);

  // Show a loading message while checking authentication
  if (isAuthenticated === null) return <p>Loading...</p>;

  // Redirect unauthenticated users to login with a message
  return isAuthenticated ? children : <Navigate to="/" replace state={{ message: "Please log in first." }} />;
};

export default ProtectedRoute;