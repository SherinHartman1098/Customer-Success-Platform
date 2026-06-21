import express from "express";
import { prisma } from "../src/lib/prisma";
import authRoutes from "./auth/auth.routes";
// @ts-ignore: Missing type declarations for 'cors'
import cors from "cors";

const app = express();
const PORT = 3000;

//CORS configuration to allow requests from the frontend
app.use(
  cors({
    origin: "http://localhost:5175",
    credentials: true,
  }),
);

app.use(express.json()); //Parse JSON bodies

app.use("/api/auth", authRoutes); // Use auth routes

//Health check for Database connection and server
async function startServer() {
  try {
    await prisma.$connect(); // Connect to the database
    console.log("Connected to the database successfully!");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to the database:", error);
  }
}
startServer();

