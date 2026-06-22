import { Router } from "express";
import {
  createCustomer,
  getAllCustomers,
  getCustomerProfile,
  updateCustomerProfile,
  deleteCustomerProfile,
} from "./customer.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/createCustomer", authMiddleware, createCustomer);
router.get("/getAllCustomers", authMiddleware, getAllCustomers);
router.get(
  "/getCustomerProfile/:customerId",
  authMiddleware,
  getCustomerProfile,
);
router.put(
  "/updateCustomerProfile/:customerId",
  authMiddleware,
  updateCustomerProfile,
);
router.delete(
  "/deleteCustomerProfile/:customerId",
  authMiddleware,
  deleteCustomerProfile,
);

export default router;
