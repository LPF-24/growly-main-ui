import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../api/authApi";

function Navbar() {
    const location = useLocation();
    const path = location.pathname;
    const navigate = useNavigate();
    const isAuthenticated = !!localStorage.getItem("accessToken");

    const username = localStorage.getItem("username");

    const handleLogout = async() => {
        if (window.confirm("Are you sure you want to log out?")) {
            try {
                await logout();
                navigate("/login");
            } catch(e) {
                alert("Logout failed");
            }
        }
    };

    // меню для Login и Register
    if (path === "/login" || path === "/register") {
        return (
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                </ul>
            </nav>
        );
    }

    // меню для HomePage
    if (path == "/") {
        return (
            <nav>
                <ul>
                    <li><Link to="/profile">Profile</Link></li>
                </ul>
            </nav>
        );
    } 

    // меню для остальных страниц
    return (
        <nav>
            <ul>
                <li><Link to="/profile">Profile</Link></li>
                <li><Link to="/habits">Habits</Link></li>
                <li><Link to="/habits/create">Create Habit</Link></li>
                {isAuthenticated && (
                    <>
                    <li style={{ marginLeft: "auto", fontStyle: "italic"}}>
                        {username ? `Logged as ${username}` : ""}
                    </li>
                    <li><button onClick={handleLogout}>Logout</button></li>
                    </>
                )}
            </ul>
        </nav>
    );
}

export default Navbar;