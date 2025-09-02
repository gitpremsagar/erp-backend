import { z } from "zod";

// Vehicle Schema
export const CreateVehicleSchema = z.object({
  vehicleName: z
    .string()
    .min(1, "Vehicle name is required")
    .max(100, "Vehicle name must be at most 100 characters long")
    .trim(),
  vehicleNumber: z
    .string()
    .min(1, "Vehicle number is required")
    .max(20, "Vehicle number must be at most 20 characters long")
    .trim(),
  vehicleType: z.enum(["TRUCK", "PICKUP", "OTHER"]),
  capacity: z
    .number()
    .int("Capacity must be a whole number")
    .positive("Capacity must be positive")
    .min(1, "Capacity must be at least 1"),
});

export const UpdateVehicleSchema = CreateVehicleSchema.partial();
