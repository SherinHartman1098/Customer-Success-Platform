import express from "express";
import { prisma } from "../src/lib/prisma";
import authRoutes from "./auth/auth.routes";
// @ts-ignore: Missing type declarations for 'cors'
import cors from "cors";
import customerRoutes from "./customer/customer.routes";
// @ts-ignore: Missing type declarations for 'cookie-parser'
import cookieParser from "cookie-parser";
import ticketsRoutes from "./tickets/tickets.routes";

const app = express();
const PORT = 3000;

//CORS configuration to allow requests from the frontend
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);

app.use(express.json()); //Parse JSON bodies
app.use(cookieParser());

app.use("/api/auth", authRoutes); // Use auth routes
app.use("/api/customer", customerRoutes); // Use customer routes
app.use("/api/tickets", ticketsRoutes); // Use tickets routes

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
