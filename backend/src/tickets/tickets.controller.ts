import { Request, Response } from "express";
import * as ticketService from "./tickets.service";

//Controller function for creating a new ticket
export const createTicket = async (req: Request, res: Response) => {
  try {
    const result = await ticketService.createTicket(req.body);
    return res.status(201).json(result);
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

//Controller function for getting all tickets
export const getAllTickets = async (req: Request, res: Response) => {
  try {
    const result = await ticketService.getAllTickets();
    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

//Controller function for getting ticket by ID
export const getTicketById = async (req: Request, res: Response) => {
  try {
    const result = await ticketService.getTicketById(
      Number(req.params.ticketId),
    );
    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

//Controller function for updating status of a ticket
export const updateTicketStatus = async (req: Request, res: Response) => {
  try {
    const result = await ticketService.updateTicketStatus(
      Number(req.params.ticketId),
      req.body.status,
    );
    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
