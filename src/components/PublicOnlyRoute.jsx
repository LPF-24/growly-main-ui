import React from "react";
import { Navigate } from "react-router-dom";

const PublicOnlyRoute = ({ children }) => {
    const isAuthenticated = !!localStorage.getItem("accessToken");
    return isAuthenticated ? <Navigate to="/profile" /> : children;
};

export default PublicOnlyRoute;