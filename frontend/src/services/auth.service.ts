import { api } from "../lib/axios";
import type { RegisterRequest } from "../types/auth.types";
import type { LoginRequest } from "../types/auth.types";
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
