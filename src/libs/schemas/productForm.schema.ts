import { z } from "zod";

export const CreateProductSchema = z.object({
  name: z
    .string()
    .min(1, "Product name is required")
    .max(200, "Product name must be at most 200 characters long")
    .trim(),
  mrp: z
    .number()
    .positive("MRP must be a positive number")
    .int("MRP must be an integer"),
  productCode: z
    .string()
    .min(1, "Product code is required")
    .max(50, "Product code must be at most 50 characters long")
    .trim(),
  lowStockLimit: z
    .number()
    .int("Low stock limit must be an integer")
    .min(0, "Low stock limit cannot be negative")
    .optional(),
  overStockLimit: z
    .number()
    .int("Over stock limit must be an integer")
    .min(0, "Over stock limit cannot be negative")
    .optional(),
  categoryId: z
    .string()
    .min(24, "Invalid category ID")
    .max(24, "Invalid category ID"),
  grammage: z
    .number()
    .int("Grammage must be an integer")
    .positive("Grammage must be a positive number")
    .optional(),
  imageUrl: z
    .string()
    .url("Invalid image URL format")
    .trim()
    .optional(),
  tagIds: z.array(z.string().min(24, "Invalid tag ID").max(24, "Invalid tag ID")).optional(),
});

export const UpdateProductSchema = CreateProductSchema.partial();

export const ProductQuerySchema = z.object({
  page: z.string().optional().transform(val => val ? parseInt(val) : 1),
  limit: z.string().optional().transform(val => val ? parseInt(val) : 10),
  search: z.string().optional(),
  categoryId: z.string().optional(),
  minPrice: z.string().optional().transform(val => val ? parseInt(val) : undefined),
  maxPrice: z.string().optional().transform(val => val ? parseInt(val) : undefined),
});
