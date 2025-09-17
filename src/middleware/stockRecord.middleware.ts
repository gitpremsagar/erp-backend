import { Request, Response, NextFunction } from "express";
import { CreateStockRecordSchema, UpdateStockRecordSchema, StockRecordQuerySchema } from "../libs/schemas/stockRecordForm.schema";
import z from "zod";

export const validateCreateStockRecord = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    CreateStockRecordSchema.parse(req.body);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Create Stock Record Validation error:\n", error);
      res.status(400).json({ message: error });
      return;
    }
    res.status(500).json({ message: "Internal server error" });
    return;
  }
  next();
};

export const validateUpdateStockRecord = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    UpdateStockRecordSchema.parse(req.body);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Update Stock Record Validation error:\n", error);
      res.status(400).json({ message: error });
      return;
    }
    res.status(500).json({ message: "Internal server error" });
    return;
  }
  next();
};

export const validateStockRecordQuery = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    StockRecordQuerySchema.parse(req.query);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Stock Record Query Validation error:\n", error);
      res.status(400).json({ message: error });
      return;
    }
    res.status(500).json({ message: "Internal server error" });
    return;
  }
  next();
};

export const validateStockRecordId = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const schema = z.object({
      id: z
        .string()
        .min(24, "Invalid stock record ID")
        .max(24, "Invalid stock record ID"),
    });
    schema.parse(req.params);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Stock Record ID Validation error:\n", error);
      res.status(400).json({ message: error });
      return;
    }
    res.status(500).json({ message: "Internal server error" });
    return;
  }
  next();
};

export const validateProductId = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const schema = z.object({
      productId: z
        .string()
        .min(24, "Invalid product ID")
        .max(24, "Invalid product ID"),
    });
    schema.parse(req.params);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Product ID Validation error:\n", error);
      res.status(400).json({ message: error });
      return;
    }
    res.status(500).json({ message: "Internal server error" });
    return;
  }
  next();
};

export const validateStockBatchId = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const schema = z.object({
      stockBatchId: z
        .string()
        .min(24, "Invalid stock batch ID")
        .max(24, "Invalid stock batch ID"),
    });
    schema.parse(req.params);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Stock Batch ID Validation error:\n", error);
      res.status(400).json({ message: error });
      return;
    }
    res.status(500).json({ message: "Internal server error" });
    return;
  }
  next();
};
