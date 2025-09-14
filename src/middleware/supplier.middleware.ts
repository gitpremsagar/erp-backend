import { Request, Response, NextFunction } from "express";
import { CreateSupplierSchema, UpdateSupplierSchema, SupplierQuerySchema } from "../libs/schemas/supplierForm.schema";
import z from "zod";

export const validateCreateSupplier = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    CreateSupplierSchema.parse(req.body);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Create Supplier Validation error:\n", error);
      res.status(400).json({ message: error });
      return;
    }
    res.status(500).json({ message: "Internal server error" });
    return;
  }
  next();
};

export const validateUpdateSupplier = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    UpdateSupplierSchema.parse(req.body);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Update Supplier Validation error:\n", error);
      res.status(400).json({ message: error });
      return;
    }
    res.status(500).json({ message: "Internal server error" });
    return;
  }
  next();
};

export const validateSupplierQuery = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    SupplierQuerySchema.parse(req.query);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Supplier Query Validation error:\n", error);
      res.status(400).json({ message: error });
      return;
    }
    res.status(500).json({ message: "Internal server error" });
    return;
  }
  next();
};
