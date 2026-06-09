import express from "express";

import { prisma } from "../src/lib/prisma";
import { start } from "node:repl";

const app = express();

async function startServer() {
  try {
    // Connect to the database
    await prisma.$connect();
    console.log("Connected to the database successfully!");
    app.listen(3000, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to the database:", error);
  }
}
startServer();

app.get("/", (req, res) => {
  res.send("Customer Success Platform API runs successfully!");
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
