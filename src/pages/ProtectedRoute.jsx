import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
  if (!isLoggedIn) {
    console.log("user not found");
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;
