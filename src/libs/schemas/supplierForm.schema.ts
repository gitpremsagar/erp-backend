import { z } from "zod";

export const CreateSupplierSchema = z.object({
  name: z
    .string()
    .min(1, "Supplier name is required")
    .max(200, "Supplier name must be at most 200 characters long")
    .trim(),
});

export const UpdateSupplierSchema = CreateSupplierSchema.partial();

export const SupplierQuerySchema = z.object({
  page: z.string().optional().transform(val => val ? parseInt(val) : 1),
  limit: z.string().optional().transform(val => val ? parseInt(val) : 10),
  search: z.string().optional(),
});
