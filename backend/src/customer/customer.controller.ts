import { Request, Response } from "express";
import * as customerService from "./customer.service";

//controller function for creating a new customer
export const createCustomer = async (req: Request, res: Response) => {
  try {
    const result = await customerService.createCustomer(req.body);
    return res.status(201).json(result);
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

//controller function for getting all customers
export const getAllCustomers = async (re: Request, res: Response) => {
  try {
    const result = await customerService.getAllCustomers();
    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

//controller function for getting customer profile
export const getCustomerProfile = async (req: Request, res: Response) => {
  try {
    const result = await customerService.getCustomerProfile(
      Number(req.params.customerId),
    );
    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

//controller function for updating customer profile
export const updateCustomerProfile = async (req: Request, res: Response) => {
  try {
    const result = await customerService.updateCustomerProfile(
      Number(req.params.customerId),
      req.body,
    );
    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

//controller function for deleting customer profile
export const deleteCustomerProfile = async (req: Request, res: Response) => {
  try {
    const result = await customerService.deleteCustomerProfile(
      Number(req.params.customerId),
    );
    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};
