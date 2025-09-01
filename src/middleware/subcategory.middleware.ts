import { Request, Response, NextFunction } from "express";
import {
  CreateSubCategorySchema,
  UpdateSubCategorySchema,
} from "../libs/schemas/categoryForm.schema";
import z from "zod";

// SubCategory Middleware
export const validateCreateSubCategory = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    CreateSubCategorySchema.parse(req.body);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Create SubCategory Validation error:\n", error);
      res.status(400).json({ message: error });
      return;
    }
    res.status(500).json({ message: "Internal server error" });
    return;
  }
  next();
};

export const validateUpdateSubCategory = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    UpdateSubCategorySchema.parse(req.body);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Update SubCategory Validation error:\n", error);
      res.status(400).json({ message: error });
      return;
    }
    res.status(500).json({ message: "Internal server error" });
    return;
  }
  next();
};
