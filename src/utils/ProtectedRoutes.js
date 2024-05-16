import React from "react";
import { Route, Navigate } from "react-router-dom";

export const ProtectedRoute = ({ isLoggedIn, isAdmin, element, ...rest }) => {
  if (!isLoggedIn) {
    // If user is not logged in, redirect to the login page
    return <Navigate to="/login" />;
  }

  if (rest.isAdmin && !isAdmin) {
    // If the route requires admin access but the user is not an admin, redirect to the home page
    return <Navigate to="/" />;
  }

  // If the user is logged in and has the required role, render the specified element
  return <Route {...rest} element={element} />;
};

export const UserProtectedRoute = ({ isLoggedIn, isAdmin, element, ...rest }) => {
  // Check if the user is logged in and is not an admin
  if (!isAdmin && isLoggedIn) {
    // If the user is logged in but is not an admin, render the specified element
    return <Route {...rest} element={element} />;
  }

  // If the user is not logged in or is an admin, redirect to the login page
  return <Navigate to="/login" />;
};

export const AdminProtectedRoute = ({ isLoggedIn, isAdmin, element, ...rest }) => {
  // Check if the user is logged in and is an admin
  if (isAdmin && isLoggedIn) {
    // If the user is logged in and is an admin, render the specified element
    return <Route {...rest} element={element} />;
  }

  // If the user is not logged in or is not an admin, redirect to the login page
  return <Navigate to="/login" />;
};