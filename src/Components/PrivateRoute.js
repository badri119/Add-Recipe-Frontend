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
  );
};

export default PrivateRoute;
