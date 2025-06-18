import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import habitApi from "../api/habitApi";
import { useAuth } from "../context/AuthContext";

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
        <div>
            <h1>{habit.name}</h1>
            <p>{habit.description}</p>
            <p>Active: {habit.active ? "Yes" : "No"}</p>
            <button onClick={handleEdit}>Edit the habit</button>
            <br />
            <button onClick={handleDelete}>Remove the habit</button>
            <br />
            <button
                type="button"
                onClick={() => navigate("/habits")}
            >
                ← Return to your habits
            </button>
        </div>
    );
}