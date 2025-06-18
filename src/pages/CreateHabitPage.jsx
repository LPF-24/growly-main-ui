import { useState } from "react";
import { useNavigate } from "react-router-dom";
import habitApi from "../api/habitApi";
import { useAuth } from "../context/AuthContext";

export default function CreateHabitPage() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [active, setActive] = useState(true);

    const navigate = useNavigate();
    const { token } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await habitApi.createHabit({
                name,
                description,
                active,
            },
            token,
           );
            navigate("/habits");
        } catch (error) {
            console.error("Ошибка при создании привычки:", error);
        }
    };

    return (
        <div>
            <h1>Create New Habit</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Habit name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <br />
                <textarea
                    placeholder="Habit description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <br />
                <label>
                    Active:
                    <input
                        type="checkbox"
                        checked={active}
                        onChange={(e) => setActive(e.target.checked)}
                    />
                </label>
                <br />
                <button type="submit">Create</button>
            </form>
            <button
                type="button"
                onClick={() => navigate("/habits")}
            >
                ← Return to your habits
            </button>
        </div>
    );
}
