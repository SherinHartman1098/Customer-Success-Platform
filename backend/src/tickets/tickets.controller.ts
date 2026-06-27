import {Request, Response} from 'express';
import * as ticketService from './tickets.service';

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

export const getAllTickets = async (req: Request, res: Response) => {
    try {
        const result = await ticketService.getAllTickets();
        return res.status(200).json(result);
    }
    catch (error: any) {
        return res.status(400).json({
            message: error.message,
        });
    }
};