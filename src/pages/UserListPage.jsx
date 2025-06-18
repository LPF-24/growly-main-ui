import React, { useEffect, useState } from "react";
import { getAllUsers, deleteUserByAdmin } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import "../styles/AuthPages.css";

function UserListPage() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (err) {
      console.error("Failed to load users:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await deleteUserByAdmin(userId);
      setUsers(users.filter((u) => u.id !== userId));
    } catch (err) {
      alert("Failed to delete user.");
    }
  };

  return (
    <div className="login-page-wrapper">
      <div className="login-container" style={{ maxWidth: "800px" }}>
        <h2 className="login-title">All Users</h2>
        <table className="user-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button
                    className="login-button"
                    onClick={() => handleDelete(user.id)}
                    style={{ backgroundColor: "#f1948a" }}
                  >
                    🗑️ Delete
                  </button>
                </td>
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

export default UserListPage;