import React, { useEffect, useState } from "react";
import { getProfile, handleApiError } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "../api/authApi";

function EditProfilePage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

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
            navigate("/profile");
        } catch (err) {
            await handleApiError(err, "Update failed", setError);
        }
    };

    return (
        <form onSubmit={handleUpdate}>
            <h2>Edit Profile</h2>
            <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
            <br/>
            <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="New Password (optional)" type="password" />
            <br/>
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" type="email" />
            <br/>
            <button type="submit">Save changes</button>
            {error && <div style={{ color: "red" }}> {error}</div>}
            <br/>
            <button onClick={() => navigate("/profile")} style={{ margin: "10px" }}>
                Return to your personal account
            </button>
        </form>
    );
}

export default EditProfilePage;