import { createContext, useState, useEffect, useContext } from "react";
import { login, logout, getCurrentUser, register } from "../api/auth";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchCurrentUser();
    } else {
      setLoading(false);
    }
  }, []);

  // const fetchCurrentUser = async () => {
  //   try {
  //     const user = await getCurrentUser();
  //     setCurrentUser(user);
  //   } catch (err) {
  //     localStorage.removeItem("token");
  //     setError("Session expired. Please login again.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // AuthContext.js
  const fetchCurrentUser = async () => {
    try {
      const user = await getCurrentUser();
      setCurrentUser(user);
      setError(null);
    } catch (err) {
      // Only clear token if it's an actual auth error
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
      }
      setError(err.message || "Session expired. Please login again.");
    } finally {
      setLoading(false);
    }
  };

  const loginUser = async (email, password) => {
    try {
      setError(null);
      const { token, user } = await login(email, password);
      localStorage.setItem("token", token);
      setCurrentUser(user);
      return user;
    } catch (err) {
      setError(err);
      throw err;
    }
  };

  const logoutUser = () => {
    logout();
    localStorage.removeItem("token");
    setCurrentUser(null);
  };

  const registerUser = async (userData) => {
    try {
      setError(null);
      const { token, user } = await register(userData);
      localStorage.setItem("token", token);
      setCurrentUser(user);
      return user;
    } catch (err) {
      setError(err);
      throw err;
    }
  };

  const value = {
    currentUser,
    login: loginUser,
    logout: logoutUser,
    register: registerUser,
    loading,
    error,
    setError,
    fetchCurrentUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
