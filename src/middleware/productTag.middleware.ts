import { Request, Response, NextFunction } from "express";
import { CreateProductTagSchema, UpdateProductTagSchema, ProductTagQuerySchema } from "../libs/schemas/productTagForm.schema";
import z from "zod";

export const validateCreateProductTag = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    CreateProductTagSchema.parse(req.body);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Create ProductTag Validation error:\n", error);
      res.status(400).json({ message: error });
      return;
    }
    res.status(500).json({ message: "Internal server error" });
    return;
  }
  next();
};

export const validateUpdateProductTag = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    UpdateProductTagSchema.parse(req.body);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Update ProductTag Validation error:\n", error);
      res.status(400).json({ message: error });
      return;
    }
    res.status(500).json({ message: "Internal server error" });
    return;
  }
  next();
};

export const validateProductTagQuery = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    ProductTagQuerySchema.parse(req.query);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("ProductTag Query Validation error:\n", error);
      res.status(400).json({ message: error });
      return;
    }
    res.status(500).json({ message: "Internal server error" });
    return;
  }
  next();
};
