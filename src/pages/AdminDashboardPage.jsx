import React from 'react';
import { useNavigate } from 'react-router-dom';

function AdminDashboardPage() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Admin Dashboard</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "1rem" }}>
        <button onClick={() => navigate("/admin/users")}>List All Users</button>
        <button onClick={() => navigate("/admin/stats")}>View User Statistics</button>
      </div>
    </div>
  );
}

export default AdminDashboardPage;
