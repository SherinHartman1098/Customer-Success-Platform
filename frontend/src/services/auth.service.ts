import { api } from "../lib/axios";
import type { RegisterRequest } from "../types/auth.types";
import type { LoginRequest } from "../types/auth.types";

// Service function for Register API call
export const registerUser = async (data: RegisterRequest) => {
  try {
    const response = await api.post("/auth/register", data);
    console.log("response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

// Service function for Login API call
export const loginUser = async (data: LoginRequest) => {
  try {
    console.log("Its in loginUser function");
    const response = await api.post("/auth/login", data);
    return response.data;
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
};

//Service fubction for Logout API call
export const logoutUser = async () => {
  try {
    const response = await api.post("/auth/logout");
    localStorage.removeItem("token");
    return response.data;
  } catch (error) {
    console.error("Error logging out user:", error);
    throw error;
  }
};

// Service function for fetching current user data
export const getCurrentUser = async () => {
  try {
    const response = await api.get("/auth/me");
    return response.data;
  } catch (error) {
    console.error("Error fetching current user:", error);
    throw error;
  }
};
