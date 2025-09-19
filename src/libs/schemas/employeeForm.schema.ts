import { z } from "zod";

export const CreateEmployeeSchema = z.object({
  name: z
    .string()
    .min(1, "Employee name is required")
    .max(100, "Employee name must be at most 100 characters long")
    .trim(),
  email: z
    .string()
    .email("Invalid email format")
    .trim(),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must be at most 15 digits")
    .trim(),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .optional(),
  address: z
    .string()
    .min(1, "Address is required")
    .max(500, "Address must be at most 500 characters long")
    .trim()
    .optional(),
  aadharNumber: z
    .number()
    .int("Aadhar number must be an integer")
    .positive("Aadhar number must be positive")
    .optional(),
  pan: z
    .string()
    .min(10, "PAN must be 10 characters long")
    .max(10, "PAN must be 10 characters long")
    .trim()
    .optional(),
});

export const UpdateEmployeeSchema = z.object({
  name: z
    .string()
    .min(1, "Employee name is required")
    .max(100, "Employee name must be at most 100 characters long")
    .trim()
    .optional(),
  email: z
    .string()
    .email("Invalid email format")
    .trim()
    .optional(),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must be at most 15 digits")
    .trim()
    .optional(),
  address: z
    .string()
    .min(1, "Address is required")
    .max(500, "Address must be at most 500 characters long")
    .trim()
    .optional(),
  aadharNumber: z
    .number()
    .int("Aadhar number must be an integer")
    .positive("Aadhar number must be positive")
    .optional(),
  pan: z
    .string()
    .min(10, "PAN must be 10 characters long")
    .max(10, "PAN must be 10 characters long")
    .trim()
    .optional(),
});

export const EmployeeQuerySchema = z.object({
  page: z.string().regex(/^\d+$/).transform(Number).optional(),
  limit: z.string().regex(/^\d+$/).transform(Number).optional(),
  search: z.string().trim().optional(),
});
