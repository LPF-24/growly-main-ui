import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logout as serverLogout } from "../api/authApi";
import { useAuth } from "../context/AuthContext";
import "../styles/Navbar.css";

function Navbar() {
    const location = useLocation();
    const path = location.pathname;
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const handleLogout = async () => {
        if (window.confirm("Are you sure you want to log out?")) {
            try {
                await serverLogout();
                logout();
                navigate("/login");
            } catch (e) {
                alert("Logout failed");
            }
        }
    };

    if (path === "/login" || path === "/register") {
        return (
            <nav className="navbar">
                <ul className="navbar-list">
                    <li><Link className="navbar-link" to="/">Home</Link></li>
                </ul>
            </nav>
        );
    }

    if (path === "/") {
        return (
            <nav className="navbar">
                <ul className="navbar-list">
                    <li><Link className="navbar-link" to="/profile">Profile</Link></li>
                </ul>
            </nav>
        );
    }

    return (
        <nav className="navbar">
            <ul className="navbar-list">
                <li><Link className="navbar-link" to="/profile">Profile</Link></li>
                <li><Link className="navbar-link" to="/habits">Habits</Link></li>
                <li><Link className="navbar-link" to="/habits/create">Create Habit</Link></li>

                {user?.role === "ROLE_USER" && (
                    <li><Link className="navbar-link" to="/promote">Become Admin</Link></li>
                )}

                {user?.role === "ROLE_ADMIN" && (
                    <li><Link className="navbar-link" to="/admin">Admin panel</Link></li>
                )}

                {user && (
                    <>
                        <li className="nav-username">Logged as {user.username}</li>
                        <li>
                            <button className="navbar-link logout-button" onClick={handleLogout}>
                                Logout
                            </button>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
}

export default Navbar;