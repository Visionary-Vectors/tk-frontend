import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import HomePage from "../UI/Home";
import AuthPage from "../AuthPage";
import Dashboard from "../UI/Dashboard";

const AppRoutes = () => {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("user_id")
  );

  useEffect(() => {
    // update auth state on every route change
    setIsAuthenticated(!!localStorage.getItem("user_id"));
  }, [location]);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route
        path="/auth"
        element={
          isAuthenticated ? <Navigate to="/dashboard" replace /> : <AuthPage />
        }
      />

      <Route
        path="/dashboard"
        element={
          isAuthenticated ? <Dashboard /> : <Navigate to="/auth" replace />
        }
      />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
