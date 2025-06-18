import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import habitApi from "../api/habitApi";
import { useAuth } from "../context/AuthContext";
import "../styles/AuthPages.css";

export default function EditHabitPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { token, loading } = useAuth();

    const [habit, setHabit] = useState({
        name: "",
        description: "",
        active: false
    });

    useEffect(() => {
        if (loading || !token) return;
        habitApi.getHabit(id, token)
            .then((data) => setHabit({
                name: data.name,
                description: data.description,
                active: data.active,
            }))
            .catch((err) => console.error("Error loading habit:", err));
    }, [id, token, loading]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await habitApi.updateHabit(id, {
                name: habit.name,
                description: habit.description,
                active: habit.active
            }, token);
            navigate(`/habits/${id}`);
        } catch (error) {
            console.error("Error updating habit:", error);
        }
    };

    return (
        <div className="login-page-wrapper">
            <form className="login-container" onSubmit={handleSubmit}>
                <h2 className="login-title">Edit Habit</h2>
                <input
                    className="login-input"
                    type="text"
                    value={habit.name}
                    onChange={(e) => setHabit({ ...habit, name: e.target.value })}
                    placeholder="Name of the habit"
                    required
                />
                <textarea
                    className="login-input"
                    value={habit.description}
                    onChange={(e) => setHabit({ ...habit, description: e.target.value })}
                    placeholder="Description"
                />
                <label>
                    <input
                        type="checkbox"
                        checked={habit.active}
                        onChange={(e) => setHabit({ ...habit, active: e.target.checked })}
                    />{" "}
                    Active
                </label>
                <button type="submit" className="login-button">Save</button>
                <button
                    type="button"
                    className="register-button"
                    onClick={() => navigate("/habits")}
                >
                    ← Return to your habits
                </button>
            </form>
        </div>
    );
}
