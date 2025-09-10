import { z } from "zod";

export const CreateProductTagSchema = z.object({
  name: z
    .string()
    .min(1, "Tag name is required")
    .max(100, "Tag name must be at most 100 characters long")
    .trim(),
});

export const UpdateProductTagSchema = CreateProductTagSchema.partial();

export const ProductTagQuerySchema = z.object({
  page: z.string().optional().transform(val => val ? parseInt(val) : 1),
  limit: z.string().optional().transform(val => val ? parseInt(val) : 10),
  search: z.string().optional(),
});
