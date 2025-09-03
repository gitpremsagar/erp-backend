import { Request, Response, NextFunction } from "express";
import { CreateOrderItemSchema, UpdateOrderItemSchema, OrderItemQuerySchema } from "../libs/schemas/orderItemForm.schema";
import z from "zod";

export const validateCreateOrderItem = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    CreateOrderItemSchema.parse(req.body);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Create OrderItem Validation error:\n", error);
      res.status(400).json({ message: error });
      return;
    }
    res.status(500).json({ message: "Internal server error" });
    return;
  }
  next();
};

export const validateUpdateOrderItem = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    UpdateOrderItemSchema.parse(req.body);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Update OrderItem Validation error:\n", error);
      res.status(400).json({ message: error });
      return;
    }
    res.status(500).json({ message: "Internal server error" });
    return;
  }
  next();
};

export const validateOrderItemQuery = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    OrderItemQuerySchema.parse(req.query);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("OrderItem Query Validation error:\n", error);
      res.status(400).json({ message: error });
      return;
    }
    res.status(500).json({ message: "Internal server error" });
    return;
  }
  next();
};
