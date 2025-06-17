import React, { useState } from "react";
import { handleApiError, register } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import "../styles/AuthPages.css"; 

function RegisterPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");

        try {
            await register(username, password, email);
            alert("Registration successful! Please login.");
            navigate("/login");
        } catch (err) {
            await handleApiError(err, "Registration failed", setError);
        }
    };

    return (
        <div className="login-page-wrapper">
            <form className="login-container" onSubmit={handleRegister}>
                <h2 className="login-title">Register</h2>
                <input
                    className="login-input"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    required
                />
                <input
                    className="login-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                    type="email"
                />
                <input
                    className="login-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                    type="password"
                />
                <button className="login-button" type="submit">Register</button>
                {error && <div style={{ color: "red" }}>{error}</div>}

                <div className="register-link">
                    <p>Already have an account?</p>
                    <button
                        type="button"
                        className="register-button"
                        onClick={() => navigate("/login")}
                    >
                        Login
                    </button>
                </div>
            </form>
        </div>
    );
}

export default RegisterPage;