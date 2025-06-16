import React, { useState } from "react";
import { promoteToAdmin } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminPromotionForm = () => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { logout } = useAuth(); // получаем функцию logout

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await promoteToAdmin(code);
      alert("Your account has been promoted to admin. Please log in again.");
      logout(); // это очистит контекст и state
      navigate("/login");
    } catch (err) {
      console.error(err);
      setError("Invalid code or promotion failed.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Become an Admin</h2>
      <label>
        Admin Code:
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />
      </label>
      <button type="submit">Submit</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
};

export default AdminPromotionForm;
