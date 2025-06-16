import React, { useEffect, useState } from "react";
import { getUserStatistics } from "../api/authApi";

function UserStatsPage() {
  const [stats, setStats] = useState([]);

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
            {stat.username} — Last login: {stat.lastLogin || "never"} — Habits: {stat.habitCount}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserStatsPage;
