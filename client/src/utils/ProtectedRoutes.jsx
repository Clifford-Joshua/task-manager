import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const userSignedUp =
    localStorage.getItem("user") === "true" ||
    sessionStorage.getItem("user") === "true";

  const userNotSet =
    localStorage.getItem("user") === null &&
    sessionStorage.getItem("user") === null;

  // user never signed up -> redirect to signup
  if (userNotSet) {
    return <Navigate to={"/signup"} />;
  }

  // user exists but not signed in
  if (!userSignedUp) {
    return <Navigate to={"/login"} />;
  }

  if (!token) {
    return <Navigate to={"/signup"} />;
  }

  return children;
};

export default ProtectedRoute;
