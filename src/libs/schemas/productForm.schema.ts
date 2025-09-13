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
  subCategoryId: z
    .string()
    .min(24, "Invalid sub-category ID")
    .max(24, "Invalid sub-category ID"),
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
  // Stock related fields (optional for product creation)
  stockId: z
    .string()
    .min(1, "Stock ID is required if creating stock")
    .optional(),
  manufacturingDate: z
    .string()
    .datetime("Invalid manufacturing date format")
    .optional(),
  arrivalDate: z
    .string()
    .datetime("Invalid arrival date format")
    .optional(),
  validityMonths: z
    .number()
    .int("Validity months must be an integer")
    .min(1, "Validity months must be at least 1")
    .optional(),
  supplierName: z
    .string()
    .max(200, "Supplier name must be at most 200 characters long")
    .trim()
    .optional(),
  supplierId: z
    .string()
    .min(24, "Invalid supplier ID")
    .max(24, "Invalid supplier ID")
    .optional(),
  stockQuantity: z
    .number()
    .int("Stock quantity must be an integer")
    .min(0, "Stock quantity cannot be negative")
    .optional(),
});

export const UpdateProductSchema = CreateProductSchema.partial();

export const ProductQuerySchema = z.object({
  page: z.string().optional().transform(val => val ? parseInt(val) : 1),
  limit: z.string().optional().transform(val => val ? parseInt(val) : 10),
  search: z.string().optional(),
  categoryId: z.string().optional(),
  subCategoryId: z.string().optional(),
  minPrice: z.string().optional().transform(val => val ? parseInt(val) : undefined),
  maxPrice: z.string().optional().transform(val => val ? parseInt(val) : undefined),
});
