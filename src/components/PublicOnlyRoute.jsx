import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PublicOnlyRoute = ({ children }) => {
    const { user } = useAuth();
    return user ? <Navigate to="/profile" /> : children;
};

export default PublicOnlyRoute;