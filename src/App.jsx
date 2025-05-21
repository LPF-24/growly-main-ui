import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

// auth pages
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import EditProfilePage from "./pages/EditProfilePage";

// habit pages
import HabitListPage from "./pages/HabitListPage";
import CreateHabitPage from "./pages/CreateHabitPage";
import HabitCard from "./components/HabitCard";
import EditHabitPage from "./pages/EditHabitPage";

function App() {
  return (
    <BrowserRouter>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/habits">Habits</Link></li>
          <li><Link to="/habits/create">Create habit</Link></li>
        </ul>
      </nav>

      <Routes>
        {/* auth routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/edit" element={<EditProfilePage />} />

        {/* habit routes */}
        <Route path="/habits" element={<HabitListPage />} />
        <Route path="/habits/create" element={<CreateHabitPage />} />
        <Route path="/habits/:id" element={<HabitCard />} />
        <Route path="/habits/:id/edit" element={<EditHabitPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;