import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import habitApi from "../api/habitApi";

export default function HabitCard() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [habit, setHabit] = useState(null);

    useEffect(() => {
        async function fetchHabit() {
            try {
                const data = await habitApi.getHabit(id);
                setHabit(data);
            } catch (error) {
                console.error("Error loading habit:", error);
            }
        }
        fetchHabit();
    }, [id]);

    if (!habit) {
        return <div>Loading...</div>;
    }

    const handleDelete = async () => {
        await habitApi.deleteHabit(id);
        window.location.href = "/";
    };

    const handleEdit = () => {
        navigate(`/habits/${id}/edit`);
    };

    return (
        <div>
            <h1>{habit.name}</h1>
            <p>{habit.description}</p>
            <p>Active: {habit.active ? "Yes" : "No"}</p>
            <button onClick={handleDelete}>Remove the habit</button>
            <br />
            <button onClick={handleEdit}>Edit the habit</button>
        </div>
    );
}