// import React from "react";
// import { Navigate, Outlet } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// function ProtectedRoute({ adminOnly = false }) {
//   const { currentUser, loading } = useAuth();

//   // Show loading indicator while checking authentication
//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   // If not authenticated, redirect to login
//   if (!currentUser) {
//     return <Navigate to="/login" />;
//   }

//   // If adminOnly and user is not admin, redirect to homepage
//   if (adminOnly && !currentUser.isAdmin) {
//     return <Navigate to="/" />;
//   }

//   // If authenticated and passes admin check, render the child routes
//   return <Outlet />;
// }

// export default ProtectedRoute;

import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ adminOnly = false }) {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && !currentUser.isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
