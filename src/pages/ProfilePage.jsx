import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { logout as serverLogout, deleteProfile, handleApiError } from "../api/authApi";
import { escape } from "he";

function ProfilePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    if (window.confirm("Are you sure you want to log out?")) {
      try {
        await serverLogout(); // серверная сессия
        logout();              // контекст
        navigate("/login");
      } catch (e) {
        await handleApiError(e, "Logout failed");
      }
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      try {
        await deleteProfile();
        logout();
        alert("Account deleted");
        navigate("/register");
      } catch (err) {
        await handleApiError(err, "Delete failed");
      }
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Your profile</h2>
      <br />
      <p><strong>Username:</strong> {escape(user.username || "")}</p>
      <br />
      <p><strong>Email:</strong> {escape(user.email || "")}</p>
      <br />
      <button onClick={handleLogout}>Logout</button>
      <br />
      <button onClick={() => navigate("/edit")}>Update Profile</button>
      <br />
      <button onClick={handleDelete}>Delete Account</button>
    </div>
  );
}

export default ProfilePage;