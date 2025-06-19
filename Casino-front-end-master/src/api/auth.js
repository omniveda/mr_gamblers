import API from "./axios";

export const login = async (email, password) => {
  try {
    const response = await API.post("/auth/login", { email, password });
    return response.data;
  } catch (error) {
    throw error.response.data.message || "Login failed";
  }
};

export const register = async (userData) => {
  try {
    const response = await API.post("/auth/register", userData);
    return response.data;
  } catch (error) {
    throw error.response.data.message || "Registration failed";
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await API.get("/auth/me");
    return response.data;
  } catch (error) {
    throw error.response.data.message || "Failed to fetch user";
  }
};

export const logout = async () => {
  try {
    await API.post("/auth/logout");
  } catch (error) {
    throw error.response.data.message || "Logout failed";
  }
};
