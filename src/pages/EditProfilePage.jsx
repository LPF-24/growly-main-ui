import React, { useEffect, useState } from "react";
import { getProfile, handleApiError, updateProfile, logout as serverLogout } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function EditProfilePage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { logout } = useAuth(); // контекстный logout

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

            await serverLogout();         // удалить refreshToken с сервера
            logout();                     // очистить контекст
            localStorage.removeItem("accessToken"); // на всякий случай
            navigate("/login");
        } catch (err) {
            await handleApiError(err, "Update failed", setError);
        }
    };

    return (
        <form onSubmit={handleUpdate}>
            <h2>Edit Profile</h2>
            <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
            />
            <br />
            <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="New Password (optional)"
                type="password"
            />
            <br />
            <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                type="email"
                required
            />
            <br />
            <button type="submit">Save changes</button>
            {error && <div style={{ color: "red" }}>{error}</div>}
            <br />
            <button
                type="button"
                onClick={() => navigate("/profile")}
                style={{ margin: "10px" }}
            >
                Return to your personal account
            </button>
        </form>
    );
}

export default EditProfilePage;