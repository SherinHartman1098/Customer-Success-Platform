import { prisma } from "../lib/prisma.js";
import { CustomerStatus } from "@prisma/client";

interface CustomerData {
  companyName: string;
  contactName: string;
  email: string;
  phone?: string;
  industry?: string;
  status?: CustomerStatus;
}
export const createCustomer = async (data: CustomerData) => {
  const { companyName, contactName, email, phone, industry, status } = data;

  // Basic validation
  if (!companyName || !contactName || !email) {
    throw new Error("Company name, contact name, and email are required");
  }

  //create customer
  const newCustomer = await prisma.customer.create({
    data: {
      companyName,
      contactName,
      email,
      phone,
      industry,
      status: status as CustomerStatus, // default to active if not provided
    },
  });

  // Return the created customer
  return {
    message: "Customer created successfully",
    customer: newCustomer,
  };
};

//Display all customers
export const getAllCustomers = async () => {
  const customers = await prisma.customer.findMany({
    where: { status: "ACTIVE" },
  });
  return customers;
};

//Get customer profile
export const getCustomerProfile = async (customerId: number) => {
  const customer = await prisma.customer.findUnique({
    where: { id: customerId },
  });
  if (!customer) {
    throw new Error("Customer not found");
  }
  return customer;
};

//Update customer profile
export const updateCustomerProfile = async (
  customerId: number,
  data: CustomerData,
) => {
  const { companyName, contactName, email, phone, industry, status } = data;
  const customer = await prisma.customer.findUnique({
    where: { id: customerId },
  });
  if (!customer) {
    throw new Error("Customer not found");
  }
  const updatedCustomer = await prisma.customer.update({
    where: { id: customerId },
    data: {
      companyName,
      contactName,
      email,
      phone,
      industry,
      status: status as CustomerStatus, // Ensure correct type
    },
  });
  return {
    message: "Customer profile updated successfully",
    customer: updatedCustomer,
  };
};

//Delete customer profile (soft delete by setting status to INACTIVE)
export const deleteCustomerProfile = async (customerId: number) => {
  const customer = await prisma.customer.findUnique({
    where: { id: customerId },
  });
  if (!customer) {
    throw new Error("Customer not found");
  }
  const deletedCustomer = await prisma.customer.update({
    where: { id: customerId },
    data: { status: "INACTIVE" },
  });
  return {
    message: "Customer profile deleted successfully",
    customer: deletedCustomer,
  };
};
