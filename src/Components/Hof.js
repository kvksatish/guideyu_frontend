//Create the HOC for protected Routes
import React from "react";
import { Navigate, useLocation } from "react-router-dom";


const Hof = ({ children }) => {
  const location = useLocation()
  const token = sessionStorage.getItem('token');;
  if (!token) {
    return <Navigate to='/' state={{ from: location }} replace />

  }
  return children;
};
export default Hof;
