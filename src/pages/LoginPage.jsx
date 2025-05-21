import React, { useState } from "react";
import { handleApiError, login } from "../api/authApi";
import { useNavigate } from "react-router-dom";

function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            await login(username, password); 
            navigate("/profile");
        } catch (err) {
            await handleApiError(err, "Login failed", setError);
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <h2>Login</h2>
            <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            <button type="submit">Login</button>
            {error && <div style={{color: "red"}}>{error}</div>}
            <br />
            <span>Don't have an account yet?</span>
            <br />
            <button onClick={() => navigate("/register")} style={{ margin: "10px" }}>
                Register
            </button>
        </form>
    );
}

export default LoginPage;