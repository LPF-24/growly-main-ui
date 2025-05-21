import React, { useEffect, useState } from "react";
import { logout, getProfile, handleApiError } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import { deleteProfile } from "../api/authApi";
import { escape } from "he";

function ProfilePage() {
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        getProfile()
           .then(setUser)
           .catch(() => {
             setError("Unauthorized or session expired");
             navigate("/login")
           });
    }, []);

    const handleLogout = async () => {
        if (window.confirm("Are you sure you want to log out?")) {
            try {
                await logout();
                navigate("/login");
            } catch(e) {
                await handleApiError(e, "Logout failed");
            }
        }    
    };

    if (!user) return <div>Loading...</div>
    
    return (
        <div style={{ padding: "20px" }}>
            <h2>Your profile</h2>
            <br/>
            <p><strong>Username:</strong> {escape(user.username)}</p>
            <br/>
            <p><strong>Email:</strong> {escape(user.email)}</p>
            <br/>
            <button onClick={handleLogout}>Logout</button>
            <br/>
            <button onClick={() => navigate("/edit")}>Update Profile</button>
            <br/>
            <button onClick={async () => {
                if (window.confirm("Are you sure you want to delete your account?")) {
                    try {
                        await deleteProfile();
                        alert("Account deleted");
                        navigate("/register");
                    } catch (err) {
                        await handleApiError(err, "Delete failed");
                    }
                }
            }}>Delete Account</button>
        </div>
    );
}

export default ProfilePage;