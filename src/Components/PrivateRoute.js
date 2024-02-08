import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = ({ component: component, ...rest }) => {
  const token = localStorage.getItem("jsonwebtoken");
  return (
    <div>
      {(() => {
        if (token) {
          return <Outlet />;
        } else {
          return <Navigate to="/" />;
        }
      })()}
    </div>

    // Another way to write this is:
    //This basically means if token exists, navigate to outlet which are the private routes and if token is not present,
    // navigate to the home page
    //return token ? <Outlet /> : <Navigate to="/" />;
  );
};

export default PrivateRoute;
