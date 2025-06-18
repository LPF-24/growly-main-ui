import React, { useEffect, useState } from "react";
import { getUserStatistics } from "../api/authApi";
import { useNavigate } from "react-router-dom";

function UserStatsPage() {
  const [stats, setStats] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getUserStatistics()
      .then(data => setStats(data))
      .catch(err => console.error("Failed to load stats:", err));
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>User Statistics</h2>
      <ul>
        {stats.map(stat => (
          <li key={stat.id}>
            {stat.username} — Last login: {stat.lastLogin || "never"}
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={() => navigate("/admin")}
      >
        ← Return to admin panel
      </button>
    </div>
  );
}

export default UserStatsPage;
