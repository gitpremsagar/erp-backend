import { Request, Response, NextFunction } from "express";
import { CreateEmployeeSchema, UpdateEmployeeSchema, EmployeeQuerySchema } from "../libs/schemas/employeeForm.schema";
import z from "zod";

export const validateCreateEmployee = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    CreateEmployeeSchema.parse(req.body);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Create Employee Validation error:\n", error);
      res.status(400).json({ message: error });
      return;
    }
    res.status(500).json({ message: "Internal server error" });
    return;
  }
  next();
};

export const validateUpdateEmployee = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    UpdateEmployeeSchema.parse(req.body);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Update Employee Validation error:\n", error);
      res.status(400).json({ message: error });
      return;
    }
    res.status(500).json({ message: "Internal server error" });
    return;
  }
  next();
};

export const validateEmployeeQuery = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    EmployeeQuerySchema.parse(req.query);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Employee Query Validation error:\n", error);
      res.status(400).json({ message: error });
      return;
    }
    res.status(500).json({ message: "Internal server error" });
    return;
  }
  next();
};
