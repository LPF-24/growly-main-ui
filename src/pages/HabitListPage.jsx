import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllHabits } from "../services/habitService";

const HabitListPage = () => {
    const [habits, setHabits] = useState([]);

    useEffect(() => {
        const fetchHabits = async () => {
            try {
                const personId = 1;
                const habitsData = await getAllHabits(personId);
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