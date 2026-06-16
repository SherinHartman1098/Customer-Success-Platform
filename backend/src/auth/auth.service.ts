import { hashPassword, comparePassword } from "./password.service.js";
// import { PrismaClient } from "@prisma/client";
import { generateToken } from "./auth.utils.js";
import { prisma } from "../lib/prisma.js";

// Register Service
interface RegisterData {
  username: string;
  email: string;
  password: string;
  //role?: string; // Optional role field
  role:string;
}
export const register = async (data: RegisterData) => {
  const { username, email, password, role } = data;
  debugger;
  // 1. basic validation
  if (!username || !email || !password) {
    throw new Error("Username, email, and password are required");
  }

  // 2. check existing user

  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) {
    throw new Error("User already exists");
  }

  // 3. hash password
  // Hash the password before storing it
  const hashedPassword = await hashPassword(password);

  // 4. save user

  const user = await prisma.user.create({
    data: {
      name: username,
      email,
      password: hashedPassword,
      role,
    },
  });
  // 5. return response
  return {
    message: "User registered successfully",
    user: {
      username,
      email,
      //   password: hashedPassword, // In a real application, you would store this in the database
    },
  };
};

//Login Service
interface LoginData {
  email: string;
  password: string;
}
export const login = async (data: LoginData) => {
  const { email, password } = data;

  //basic validation
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  //compare the provided password with the stored hash during registration
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error("Invalid email or password");
  }
  const isPasswordValid = await comparePassword(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }
  const token = generateToken(user.id, user.email);
  return {
    message: "Login successful",
    token,
  };
};
