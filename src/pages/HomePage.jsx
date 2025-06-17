import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/HomePage.css";

function HomePage() {
    const navigate = useNavigate();

    return (
        <div className="home-page-wrapper">
            <div className="home-overlay"></div>
            <div className="home-content">
                <h1>Welcome to Growly Habit Tracker</h1>
                <p>Track your habits and stay on top of your goals!</p>
                <button onClick={() => navigate("/login")} className="home-button">
                    Login
                </button>
                <button onClick={() => navigate("/register")} className="home-button">
                    Register
                </button>
            </div>
        </div>
    );
}

export default HomePage;