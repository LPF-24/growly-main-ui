import React from "react";
import { useNavigate } from "react-router-dom";

function HomePage() {
    const navigate = useNavigate();

    return (
        <div style={{ textAlign: "center", paddingTop: "50px" }}>
            <h1>Welcome to Growly Habit Tracker</h1>
            <p>Track your habits and stay on top of your goals!</p>
            <button onClick={() => navigate("/login")} style={{ margin: "10px" }}>
                Login
            </button>
            <br/>
            <button onClick={() => navigate("/register")} style={{ margin: "10px" }}>
                Register
            </button>
        </div>
    );
}

export default HomePage;