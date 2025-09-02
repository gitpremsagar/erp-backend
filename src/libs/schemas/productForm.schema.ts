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
  stock: z
    .number()
    .int("Stock must be an integer")
    .min(0, "Stock cannot be negative"),
  stockEntryDate: z.string().datetime("Invalid stock entry date format"),
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
  lowStockAlertColor: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/, "Invalid color format. Use hex color code (e.g., #FF0000)")
    .optional(),
  lowStockAlertMessage: z
    .string()
    .max(100, "Low stock alert message must be at most 100 characters long")
    .optional(),
  overStockAlertColor: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/, "Invalid color format. Use hex color code (e.g., #FF0000)")
    .optional(),
  overStockAlertMessage: z
    .string()
    .max(100, "Over stock alert message must be at most 100 characters long")
    .optional(),
  inStockAlertColor: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/, "Invalid color format. Use hex color code (e.g., #FF0000)")
    .optional(),
  inStockAlertMessage: z
    .string()
    .max(100, "In stock alert message must be at most 100 characters long")
    .optional(),
  expiryAlertDays: z
    .number()
    .int("Expiry alert days must be an integer")
    .min(0, "Expiry alert days cannot be negative")
    .optional(),
  expiryAlertColor: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/, "Invalid color format. Use hex color code (e.g., #FF0000)")
    .optional(),
  expiryAlertMessage: z
    .string()
    .max(100, "Expiry alert message must be at most 100 characters long")
    .optional(),
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
    .number()
    .int("Grammage must be an integer")
    .positive("Grammage must be a positive number"),
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
