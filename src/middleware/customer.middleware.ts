import { Request, Response, NextFunction } from "express";
import { CreateCustomerSchema, UpdateCustomerSchema, CustomerQuerySchema } from "../libs/schemas/customerForm.schema";
import z from "zod";

export const validateCreateCustomer = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    CreateCustomerSchema.parse(req.body);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Create Customer Validation error:\n", error);
      res.status(400).json({ message: error });
      return;
    }
    res.status(500).json({ message: "Internal server error" });
    return;
  }
  next();
};

export const validateUpdateCustomer = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    UpdateCustomerSchema.parse(req.body);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Update Customer Validation error:\n", error);
      res.status(400).json({ message: error });
      return;
    }
    res.status(500).json({ message: "Internal server error" });
    return;
  }
  next();
};

export const validateCustomerQuery = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    CustomerQuerySchema.parse(req.query);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Customer Query Validation error:\n", error);
      res.status(400).json({ message: error });
      return;
    }
    res.status(500).json({ message: "Internal server error" });
    return;
  }
  next();
};
