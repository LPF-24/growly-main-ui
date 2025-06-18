import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import habitApi from "../api/habitApi";
import { useAuth } from "../context/AuthContext";
import "../styles/MainPages.css";
import habitImage from "../assets/habit-detail-image.png"; // Картинка, нарисованная для этой страницы

export default function HabitCard() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [habit, setHabit] = useState(null);
  const { token, loading } = useAuth();

  useEffect(() => {
    if (loading || !token) return;

    async function fetchHabit() {
      try {
        const data = await habitApi.getHabit(id, token);
        setHabit(data);
      } catch (error) {
        console.error("Error loading habit:", error);
      }
    }

    fetchHabit();
  }, [id, token, loading]);

  if (!habit) {
    return <div>Loading...</div>;
  }

  const handleDelete = async () => {
    try {
      await habitApi.deleteHabit(id, token);
      navigate("/habits");
    } catch (error) {
      console.error("Error deleting habit:", error);
    }
  };

  const handleEdit = () => {
    navigate(`/habits/${id}/edit`);
  };

  return (
    <div className="profile-page">
      <div className="profile-overlay"></div>
      <div className="profile-content-wrapper">
        <div className="profile-card">
          <h2>{habit.name}</h2>
          <p>
            <strong>Description:</strong> {habit.description}
          </p>
          <p>
            <strong>Active:</strong> {habit.active ? "✅ Yes" : "❌ No"}
          </p>

          <div className="profile-buttons">
            <button className="profile-btn update" onClick={handleEdit}>
              ✏️ Edit the habit
            </button>
            <button className="profile-btn delete" onClick={handleDelete}>
              🗑️ Remove the habit
            </button>
            <button
              className="profile-btn logout"
              type="button"
              onClick={() => navigate("/habits")}
            >
              ← Return to your habits
            </button>
          </div>
        </div>

        <div className="profile-image-block">
          <img src={habitImage} alt="Habit detail visual" />
        </div>
      </div>
    </div>
  );
}