import React, { useEffect, useState } from "react";
import { getUserStatistics } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import "../styles/AuthPages.css";

function UserStatsPage() {
  const [stats, setStats] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getUserStatistics()
      .then((data) => setStats(data))
      .catch((err) => console.error("Failed to load stats:", err));
  }, []);

  return (
    <div className="login-page-wrapper">
      <div className="login-container" style={{ maxWidth: "800px" }}>
        <h2 className="login-title">User Statistics</h2>
        <table className="user-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Last Login</th>
            </tr>
          </thead>
          <tbody>
            {stats.map((stat) => (
              <tr key={stat.id}>
                <td>{stat.username}</td>
                <td>{stat.lastLogin || "Never"}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          className="register-button"
          onClick={() => navigate("/admin")}
        >
          ← Return to admin panel
        </button>
      </div>
    </div>
  );
}

export default UserStatsPage;