import React, { useState } from "react";
import { handleApiError, login as loginApi } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/AuthPages.css"

function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await loginApi(username, password);

            const userData = response.user || { username };
            login(userData, response.accessToken);
            
            navigate("/profile");
        } catch (err) {
            await handleApiError(err, "Login failed", setError);
        }
    };

    return (
        <div className="login-page-wrapper">
            <form className="login-container" onSubmit={handleLogin}>
                <h2 className="login-title">Login</h2>
                <input 
                    className="login-input"
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    placeholder="Username" 
                />
                <input 
                    className="login-input"
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="Password" 
                />
                <button className="login-button" type="submit">Login</button>
                {error && <div style={{color: "red"}}>{error}</div>}

                <div className="register-link">
                    <p>Don't have an account yet?</p>
                    <button 
                        type="button" 
                        className="register-button" 
                        onClick={() => navigate("/register")}
                    >
                        Register
                    </button>
                </div>
            </form>
        </div>
    );
}

export default LoginPage;