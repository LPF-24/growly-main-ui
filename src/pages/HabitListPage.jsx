import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import habitApi from "../api/habitApi";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const HabitListPage = () => {
    const [habits, setHabits] = useState([]);
    const { user, token, loading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchHabits = async () => {
            try {
                const habitsData = await habitApi.getAllHabits(token);
                setHabits(habitsData);
            } catch (error) {
                console.error("Failed to fetch habits:", error);
            }
        };
        fetchHabits();
    }, []);

    return (
        <div>
            <h1>My Habits</h1>
            <ul>
                {habits.map((habit) => (
                    <li key={habit.id}>
                        <Link to={`/habits/${habit.id}`}>
                            {habit.name} — {habit.description}
                        </Link>
                    </li>
                ))}
            </ul>
            <button
                type="button"
                onClick={() => navigate("/profile")}
            >
                ← Return to your personal account
            </button>
        </div>
    );
};

export default HabitListPage;