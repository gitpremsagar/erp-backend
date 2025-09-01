import { Request, Response, NextFunction } from "express";
import {
  CreateCategorySchema,
  UpdateCategorySchema,
} from "../libs/schemas/categoryForm.schema";
import z from "zod";

// Category Middleware
export const validateCreateCategory = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    CreateCategorySchema.parse(req.body);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Create Category Validation error:\n", error);
      res.status(400).json({ message: error });
      return;
    }
    res.status(500).json({ message: "Internal server error" });
    return;
  }
  next();
};

export const validateUpdateCategory = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    UpdateCategorySchema.parse(req.body);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Update Category Validation error:\n", error);
      res.status(400).json({ message: error });
      return;
    }
    res.status(500).json({ message: "Internal server error" });
    return;
  }
  next();
};
