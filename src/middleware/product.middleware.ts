import { Request, Response, NextFunction } from "express";
import { CreateProductSchema, UpdateProductSchema, ProductQuerySchema } from "../libs/schemas/productForm.schema";
import z from "zod";

export const validateCreateProduct = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    CreateProductSchema.parse(req.body);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Create Product Validation error:\n", error);
      res.status(400).json({ message: error });
      return;
    }
    res.status(500).json({ message: "Internal server error" });
    return;
  }
  next();
};

export const validateUpdateProduct = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    UpdateProductSchema.parse(req.body);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Update Product Validation error:\n", error);
      res.status(400).json({ message: error });
      return;
    }
    res.status(500).json({ message: "Internal server error" });
    return;
  }
  next();
};

export const validateProductQuery = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    ProductQuerySchema.parse(req.query);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Product Query Validation error:\n", error);
      res.status(400).json({ message: error });
      return;
    }
    res.status(500).json({ message: "Internal server error" });
    return;
  }
  next();
};
