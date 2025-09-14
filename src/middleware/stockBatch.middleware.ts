import { Request, Response, NextFunction } from "express";
import { CreateStockBatchSchema, UpdateStockBatchSchema, StockBatchQuerySchema } from "../libs/schemas/stockBatchForm.schema";
import z from "zod";

export const validateCreateStockBatch = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    CreateStockBatchSchema.parse(req.body);
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

export const validateUpdateStockBatch = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    UpdateStockBatchSchema.parse(req.body);
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

export const validateStockBatchQuery = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    StockBatchQuerySchema.parse(req.query);
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
