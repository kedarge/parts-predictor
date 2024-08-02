import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";

  const encodedUser = sessionStorage.getItem("user");
  const user = encodedUser
    ? JSON.parse(atob(encodedUser))
    : { isLoggedIn: false };

  if (!user.isLoggedIn) {
    console.log("user not found");
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;
