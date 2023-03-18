import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import auth from "../../services/authService";
import MovieForm from "../movieForm";

const ProtectedRoute = () => {
  const location = useLocation();

  return auth.getCurrentUser() ? (
    <MovieForm />
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};

export default ProtectedRoute;
