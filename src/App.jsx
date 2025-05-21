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
import PrivateRoute from "./components/PrivateRoute";
import PublicOnlyRoute from "./components/PublicOnlyRoute";

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
        <Route path="/" element={<PublicOnlyRoute><HomePage /></PublicOnlyRoute>} />
        <Route path="/login" element={<PublicOnlyRoute><LoginPage /></PublicOnlyRoute>} />
        <Route path="/register" element={<PublicOnlyRoute><RegisterPage /></PublicOnlyRoute>} />
        <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
        <Route path="/edit" element={<PrivateRoute><EditProfilePage /></PrivateRoute>} />

        {/* habit routes */}
        <Route path="/habits" element={<PrivateRoute><HabitListPage /></PrivateRoute>} />
        <Route path="/habits/create" element={<PrivateRoute><CreateHabitPage /></PrivateRoute>} />
        <Route path="/habits/:id" element={<PrivateRoute><HabitCard /></PrivateRoute>} />
        <Route path="/habits/:id/edit" element={<PrivateRoute><EditHabitPage /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;