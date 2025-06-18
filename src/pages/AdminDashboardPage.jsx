import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AdminPage.css"; 
import adminPanelImage from "../assets/admin-panel-image.png";

function AdminDashboardPage() {
  const navigate = useNavigate();

  return (
    <div className="profile-page">
      <div className="profile-overlay"></div>
      <div className="profile-content-wrapper">
        <div className="profile-card">
          <h2>Admin Dashboard</h2>
          <div className="admin-tile-container">
            <div
              className="admin-tile"
              onClick={() => navigate("/admin/users")}
            >
              👥 List All Users
            </div>
            <div
              className="admin-tile"
              onClick={() => navigate("/admin/stats")}
            >
              📊 View User Statistics
            </div>
          </div>
        </div>
        <div className="profile-image-block">
          <img src={adminPanelImage} alt="Admin panel visual" />
        </div>
      </div>
    </div>
  );
}

export default AdminDashboardPage;