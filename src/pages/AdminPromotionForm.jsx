import React, { useState } from "react";
import { promoteToAdmin } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/AuthPages.css";

const AdminPromotionForm = () => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await promoteToAdmin(code);
      alert("Your account has been promoted to admin. Please log in again.");
      logout();
      navigate("/login");
    } catch (err) {
      console.error(err);
      setError("Invalid code or promotion failed.");
    }
  };

  return (
    <div className="login-page-wrapper">
      <form className="login-container" onSubmit={handleSubmit}>
        <h2 className="login-title">Become an Admin</h2>

        <input
          className="login-input"
          type="text"
          placeholder="Enter admin code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />

        <button type="submit" className="login-button">
          Submit
        </button>

        {error && <div style={{ color: "red", textAlign: "center" }}>{error}</div>}

        <div className="register-link">
          <p>Changed your mind?</p>
          <button
            type="button"
            className="register-button"
            onClick={() => navigate("/profile")}
          >
            Back to Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminPromotionForm;