import { Router } from "express";
import { createTicket, getAllTickets, getTicketById, updateTicketStatus } from "./tickets.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/createTicket", createTicket);
router.get("/getAllTickets", getAllTickets);
router.get("/getTicketById/:ticketId", getTicketById);
router.patch("/updateTicketStatus/:ticketId", updateTicketStatus);

export default router;
