import React, { useEffect, useState } from "react";
import { getAllUsers } from "../api/authApi";

function UserListPage() {
  const [users, setUsers] = useState([]);

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
    </div>
  );
}

export default UserListPage;
