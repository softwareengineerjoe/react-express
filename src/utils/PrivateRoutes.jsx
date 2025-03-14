import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const isValidToken = validateToken(token);
      
      if (!isValidToken) {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(true);
      }
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const validateToken = (token) => {
    try {
      const decodedToken = JSON.parse(atob(token.split('.')[1])); 
      const currentTime = Math.floor(Date.now() / 1000);
      return decodedToken.exp > currentTime; 
    } catch (e) {
      return false; 
    }
  };

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/create-account" />;
  }

  return (
    <div className="relative">
      <Outlet />
    </div>
  );
};

export default PrivateRoutes;
