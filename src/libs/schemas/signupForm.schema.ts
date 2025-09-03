import { z } from "zod";

export const SignupFormSchema = z
  .object({
    email: z.string().email("Invalid email format"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters long")
      .max(100, "Password must be at most 100 characters long")
      .trim(),
    name: z
      .string()
      .min(2, "Name must be at least 2 characters long")
      .max(100, "Name must be at most 100 characters long")
      .trim(),
    phone: z
      .string()
      .min(10, "Phone number must be at least 10 digits")
      .max(15, "Phone number must be at most 15 digits")
      .trim()
      .optional(),
    aadharNumber: z.number().optional(),
    pan: z.string().optional(),
    gstNumber: z.string().optional(),
    address: z.string().optional(),
    confirmPassword: z
      .string()
      .min(6, "Confirm Password must be at least 6 characters long")
      .max(100, "Confirm Password must be at most 100 characters long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
