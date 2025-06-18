import React, { useEffect, useState } from "react";
import { getAllUsers } from "../api/authApi";
import { useNavigate } from "react-router-dom";

function UserListPage() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllUsers()
      .then(data => setUsers(data))
      .catch(err => console.error("Failed to load users:", err));
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>All Users</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.username} — {user.email} — Role: {user.role}</li>
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

export default UserListPage;
