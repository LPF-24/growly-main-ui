import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { logout as serverLogout, deleteProfile, handleApiError } from "../api/authApi";
import { escape } from "he";
import "../styles/ProfilePage.css";
import profileImage from "../assets/profile-side-image.png";

function ProfilePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    if (window.confirm("Are you sure you want to log out?")) {
      try {
        await serverLogout();
        logout();
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
    <div className="profile-page">
      <div className="profile-overlay"></div>
      <div className="profile-content-wrapper">
        <div className="profile-card">
          <h2>Your Profile</h2>
          <p><strong>Username:</strong> {escape(user.username || "")}</p>
          <p><strong>Email:</strong> {escape(user.email || "")}</p>

          <div className="profile-buttons">
            <button className="profile-btn logout" onClick={handleLogout}>
              🚪 Logout
            </button>
            <button className="profile-btn update" onClick={() => navigate("/edit")}>
              🖊️ Update Profile
            </button>
            <button className="profile-btn delete" onClick={handleDelete}>
              🗑️ Delete Account
            </button>
          </div>
        </div>

        <div className="profile-image-block">
          <img src={profileImage} alt="Productivity nature" />
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;