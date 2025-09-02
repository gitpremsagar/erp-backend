import { Request, Response, NextFunction } from "express";
import { CreateOrderSchema, UpdateOrderSchema, OrderQuerySchema } from "../libs/schemas/orderForm.schema";
import z from "zod";

export const validateCreateOrder = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    CreateOrderSchema.parse(req.body);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Create Order Validation error:\n", error);
      res.status(400).json({ message: error });
      return;
    }
    res.status(500).json({ message: "Internal server error" });
    return;
  }
  next();
};

export const validateUpdateOrder = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    UpdateOrderSchema.parse(req.body);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Update Order Validation error:\n", error);
      res.status(400).json({ message: error });
      return;
    }
    res.status(500).json({ message: "Internal server error" });
    return;
  }
  next();
};

export const validateOrderQuery = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    OrderQuerySchema.parse(req.query);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Order Query Validation error:\n", error);
      res.status(400).json({ message: error });
      return;
    }
    res.status(500).json({ message: "Internal server error" });
    return;
  }
  next();
};
