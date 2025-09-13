import { Request, Response, NextFunction } from "express";
import { CreateStockSchema, UpdateStockSchema, StockQuerySchema } from "../libs/schemas/stockForm.schema";
import z from "zod";

export const validateCreateStock = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    CreateStockSchema.parse(req.body);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Create Stock Validation error:\n", error);
      res.status(400).json({ message: error });
      return;
    }
    res.status(500).json({ message: "Internal server error" });
    return;
  }
  next();
};

export const validateUpdateStock = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    UpdateStockSchema.parse(req.body);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Update Stock Validation error:\n", error);
      res.status(400).json({ message: error });
      return;
    }
    res.status(500).json({ message: "Internal server error" });
    return;
  }
  next();
};

export const validateStockQuery = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    StockQuerySchema.parse(req.query);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Stock Query Validation error:\n", error);
      res.status(400).json({ message: error });
      return;
    }
    res.status(500).json({ message: "Internal server error" });
    return;
  }
  next();
};

export const validateToggleArchive = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const schema = z.object({
      isArchived: z.boolean(),
    });
    schema.parse(req.body);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Toggle Archive Validation error:\n", error);
      res.status(400).json({ message: error });
      return;
    }
    res.status(500).json({ message: "Internal server error" });
    return;
  }
  next();
};
