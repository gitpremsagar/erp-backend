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
  description: z
    .string()
    .min(1, "Description is required")
    .max(1000, "Description must be at most 1000 characters long")
    .trim(),
  expiryDate: z.string().datetime("Invalid expiry date format"),
  validity: z
    .string()
    .min(1, "Validity is required")
    .max(100, "Validity must be at most 100 characters long")
    .trim(),
  quantity: z
    .number()
    .int("Quantity must be an integer")
    .min(0, "Quantity cannot be negative"),
  tags: z.array(z.string().trim()).optional(),
  imageUrl: z
    .string()
    .url("Invalid image URL format")
    .trim(),
  categoryId: z
    .string()
    .min(24, "Invalid category ID")
    .max(24, "Invalid category ID"),
  groupId: z
    .string()
    .min(24, "Invalid group ID")
    .max(24, "Invalid group ID"),
  subCategoryId: z
    .string()
    .min(24, "Invalid sub-category ID")
    .max(24, "Invalid sub-category ID"),
  grammage: z
    .string()
    .min(1, "Grammage is required")
    .max(50, "Grammage must be at most 50 characters long")
    .trim(),
});

export const UpdateProductSchema = CreateProductSchema.partial();

export const ProductQuerySchema = z.object({
  page: z.string().optional().transform(val => val ? parseInt(val) : 1),
  limit: z.string().optional().transform(val => val ? parseInt(val) : 10),
  search: z.string().optional(),
  categoryId: z.string().optional(),
  groupId: z.string().optional(),
  subCategoryId: z.string().optional(),
  minPrice: z.string().optional().transform(val => val ? parseInt(val) : undefined),
  maxPrice: z.string().optional().transform(val => val ? parseInt(val) : undefined),
});
