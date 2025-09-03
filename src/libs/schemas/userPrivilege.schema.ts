import { z } from "zod";

export const CreateUserPrivilegeSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters long")
    .max(50, "Name must be at most 50 characters long")
    .trim(),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long")
    .max(200, "Description must be at most 200 characters long")
    .trim(),
});

export const UpdateUserPrivilegeSchema = CreateUserPrivilegeSchema.partial();
