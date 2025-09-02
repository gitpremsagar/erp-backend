import { Request, Response, NextFunction } from "express";
import {
  CreateVehicleSchema,
  UpdateVehicleSchema,
} from "../libs/schemas/vehicleForm.schema";
import z from "zod";

// Vehicle Middleware
export const validateCreateVehicle = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    CreateVehicleSchema.parse(req.body);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Create Vehicle Validation error:\n", error);
      res.status(400).json({ message: error });
      return;
    }
    res.status(500).json({ message: "Internal server error" });
    return;
  }
  next();
};

export const validateUpdateVehicle = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    UpdateVehicleSchema.parse(req.body);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Update Vehicle Validation error:\n", error);
      res.status(400).json({ message: error });
      return;
    }
    res.status(500).json({ message: "Internal server error" });
    return;
  }
  next();
};
