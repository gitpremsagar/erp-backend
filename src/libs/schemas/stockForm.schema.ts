import { z } from "zod";

export const CreateStockSchema = z.object({
  productId: z
    .string()
    .min(24, "Invalid product ID")
    .max(24, "Invalid product ID"),
  manufacturingDate: z
    .string()
    .datetime("Invalid manufacturing date format"),
  arrivalDate: z
    .string()
    .datetime("Invalid arrival date format"),
  validityMonths: z
    .number()
    .int("Validity months must be an integer")
    .min(1, "Validity months must be at least 1")
    .default(10),
  supplierName: z
    .string()
    .max(200, "Supplier name must be at most 200 characters long")
    .trim()
    .optional(),
  supplierId: z
    .string()
    .min(24, "Invalid supplier ID")
    .max(24, "Invalid supplier ID")
    .optional()
    .nullable(),
  stockQuantity: z
    .number()
    .int("Stock quantity must be an integer")
    .min(0, "Stock quantity cannot be negative")
    .default(0),
  isArchived: z
    .boolean()
    .default(false)
    .optional(),
});

export const UpdateStockSchema = CreateStockSchema.partial();

export const StockQuerySchema = z.object({
  page: z.string().optional().transform(val => val ? parseInt(val) : 1),
  limit: z.string().optional().transform(val => val ? parseInt(val) : 10),
  search: z.string().optional(),
  productId: z.string().optional(),
  supplierName: z.string().optional(),
  isArchived: z.string().optional().transform(val => val === 'true' ? true : val === 'false' ? false : undefined),
  expired: z.string().optional().transform(val => val === 'true' ? true : val === 'false' ? false : undefined),
  lowStock: z.string().optional().transform(val => val === 'true' ? true : val === 'false' ? false : undefined),
});
