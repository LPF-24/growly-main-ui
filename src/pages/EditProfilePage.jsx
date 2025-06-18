import React, { useEffect, useState } from "react";
import { getProfile, handleApiError, updateProfile, logout as serverLogout } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/AuthPages.css";

function EditProfilePage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { logout } = useAuth();

    useEffect(() => {
        getProfile()
            .then((user) => {
                setUsername(user.username);
                setEmail(user.email);
            })
            .catch(() => {
                setError("Unauthorized");
                navigate("/login");
            });
    }, []);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await updateProfile({ username, password, email });

            await serverLogout();
            logout();
            localStorage.removeItem("accessToken");
            navigate("/login");
        } catch (err) {
            await handleApiError(err, "Update failed", setError);
        }
    };

    return (
        <div className="login-page-wrapper">
            <form onSubmit={handleUpdate} className="login-container">
                <h2 className="login-title">Edit Profile</h2>
                <input
                    className="login-input"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    required
                />
                <input
                    className="login-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="New Password (optional)"
                    type="password"
                />
                <input
                    className="login-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    type="email"
                    required
                />
                <button type="submit" className="login-button">Save changes</button>
                {error && <div style={{ color: "red" }}>{error}</div>}
                <button
                    type="button"
                    className="register-button"
                    onClick={() => navigate("/profile")}
                >
                    ← Return to your personal account
                </button>
            </form>
        </div>
    );
}

export default EditProfilePage;