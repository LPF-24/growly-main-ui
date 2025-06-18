import { useState } from "react";
import { useNavigate } from "react-router-dom";
import habitApi from "../api/habitApi";
import { useAuth } from "../context/AuthContext";
import "../styles/AuthPages.css";

export default function CreateHabitPage() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [active, setActive] = useState(true);

    const navigate = useNavigate();
    const { token } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await habitApi.createHabit({ name, description, active }, token);
            navigate("/habits");
        } catch (error) {
            console.error("Ошибка при создании привычки:", error);
        }
    };

    return (
        <div className="login-page-wrapper">
            <form className="login-container" onSubmit={handleSubmit}>
                <h2 className="login-title">Create New Habit</h2>
                <input
                    className="login-input"
                    type="text"
                    placeholder="Habit name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <textarea
                    className="login-input"
                    placeholder="Habit description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <label>
                    <input
                        type="checkbox"
                        checked={active}
                        onChange={(e) => setActive(e.target.checked)}
                    />{" "}
                    Active
                </label>
                <button type="submit" className="login-button">Create</button>
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