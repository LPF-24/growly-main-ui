import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { getProfile } from "../api/authApi";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = (userData, accessToken) => {
    setUser(userData);
    setToken(accessToken);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setUser(null);
    setToken(null);
  } 

  // При старте приложения — восстановить user из токена
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
        try {
            const decoded = jwtDecode(token);
            getProfile()
                .then((profileData) => {
                  setUser({
                      id: decoded.id,
                      username: decoded.username,
                      role: decoded.role,
                      email: profileData.email || "",
                  });
                  setToken(token);
                  setLoading(false);
                })
                .catch(() => {
                  console.warn("Failed to get profile after token decode");
                  setUser(null);
                  setToken(null);
                  setLoading(false);
                });
        } catch (e) {
            console.error("Invalid token", e);
            localStorage.removeItem("accessToken");
            localStorage.removeItem("username");
            logout();
            setUser(null);
            setLoading(false);
        }
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);