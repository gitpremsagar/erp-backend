import { Request, Response, NextFunction } from "express";
import {
  CreateGroupSchema,
  UpdateGroupSchema,
} from "../libs/schemas/categoryForm.schema";
import z from "zod";

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
