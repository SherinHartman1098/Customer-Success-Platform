import { Router } from "express";
import { createTicket, getAllTickets } from "./tickets.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/createTicket", createTicket);
router.get("/getAllTickets", getAllTickets);

export default router;
