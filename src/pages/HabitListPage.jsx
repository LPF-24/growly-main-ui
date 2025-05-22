import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import habitApi from "../api/habitApi";

const HabitListPage = () => {
    const [habits, setHabits] = useState([]);

    useEffect(() => {
        const fetchHabits = async () => {
            try {
                const habitsData = await habitApi.getAllHabits();
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
        </div>
    );
};

export default HabitListPage;