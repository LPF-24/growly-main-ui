import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import habitApi from "../api/habitApi";

export default function EditHabitPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [habit, setHabit] = useState({
        name: "",
        description: "",
        active: false
    });

    useEffect(() => {
        async function fetchHabit() {
            try {
                const data = await habitApi.getHabit(id);
                setHabit({
                    name: data.name,
                    description: data.description,
                    active: data.active
                });
            } catch (error) {
                console.error("Error loading habit:", error);
            }
        }
        fetchHabit();
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Отправляем только нужные поля
            await habitApi.updateHabit(id, {
                name: habit.name,
                description: habit.description,
                active: habit.active
            });
            navigate(`/habits/${id}`);
        } catch (error) {
            console.error("Error updating habit:", error);
        }
    };

    return (
        <div>
            <h1>Edit Habit</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={habit.name}
                    onChange={(e) => setHabit({ ...habit, name: e.target.value })}
                    placeholder="Name of the habit"
                    required
                />
                <br />
                <textarea
                    value={habit.description}
                    onChange={(e) => setHabit({ ...habit, description: e.target.value })}
                    placeholder="Description"
                    required
                />
                <br />
                <label>
                    Active:
                    <input
                        type="checkbox"
                        checked={habit.active}
                        onChange={(e) => setHabit({ ...habit, active: e.target.checked })}
                    />
                </label>
                <br />
                <button type="submit">Save</button>
            </form>
        </div>
    );
}
