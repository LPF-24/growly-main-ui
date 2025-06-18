import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import habitApi from "../api/habitApi";
import { useAuth } from "../context/AuthContext";
import "../styles/MainPages.css";
import habitImage from "../assets/habit-list-image.png"; // новая картинка для правого блока

const HabitListPage = () => {
    const [habits, setHabits] = useState([]);
    const { token } = useAuth();
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
        <div className="profile-page">
            <div className="profile-overlay"></div>
            <div className="profile-content-wrapper">
                <div className="profile-card">
                    <h2>My Habits</h2>
                    {habits.length === 0 ? (
                        <p>You haven't created any habits yet.</p>
                    ) : (
                        <ul className="habit-list">
                        {habits.map((habit) => (
                            <li key={habit.id} className="habit-item">
                            <Link to={`/habits/${habit.id}`} className="habit-title">
                                {habit.name}
                            </Link>
                            <div className="habit-description">
                                {habit.description}
                            </div>
                            </li>
                        ))}
                        </ul>
                    )}

                    <div className="profile-buttons">
                        <button className="profile-btn update" onClick={() => navigate("/habits/create")}>
                            + Create New Habit
                        </button>
                        <button className="profile-btn logout" onClick={() => navigate("/profile")}>
                            ← Return to your profile
                        </button>
                    </div>
                </div>

                <div className="profile-image-block">
                    <img src={habitImage} alt="Habit list visual" />
                </div>
            </div>
        </div>
    );
};

export default HabitListPage;