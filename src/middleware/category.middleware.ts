import { Request, Response, NextFunction } from "express";
import {
  CreateCategorySchema,
  UpdateCategorySchema,
  CreateGroupSchema,
  UpdateGroupSchema,
  CreateSubCategorySchema,
  UpdateSubCategorySchema,
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

// Group Middleware
export const validateCreateGroup = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    CreateGroupSchema.parse(req.body);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Create Group Validation error:\n", error);
      res.status(400).json({ message: error });
      return;
    }
    res.status(500).json({ message: "Internal server error" });
    return;
  }
  next();
};

export const validateUpdateGroup = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    UpdateGroupSchema.parse(req.body);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Update Group Validation error:\n", error);
      res.status(400).json({ message: error });
      return;
    }
    res.status(500).json({ message: "Internal server error" });
    return;
  }
  next();
};

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
