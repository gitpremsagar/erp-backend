"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductQuerySchema = exports.UpdateProductSchema = exports.CreateProductSchema = void 0;
const zod_1 = require("zod");
exports.CreateProductSchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .min(1, "Product name is required")
        .max(200, "Product name must be at most 200 characters long")
        .trim(),
    mrp: zod_1.z
        .number()
        .positive("MRP must be a positive number")
        .int("MRP must be an integer"),
    productCode: zod_1.z
        .string()
        .min(1, "Product code is required")
        .max(50, "Product code must be at most 50 characters long")
        .trim(),
    lowStockLimit: zod_1.z
        .number()
        .int("Low stock limit must be an integer")
        .min(0, "Low stock limit cannot be negative")
        .optional(),
    overStockLimit: zod_1.z
        .number()
        .int("Over stock limit must be an integer")
        .min(0, "Over stock limit cannot be negative")
        .optional(),
    categoryId: zod_1.z
        .string()
        .min(24, "Invalid category ID")
        .max(24, "Invalid category ID"),
    grammage: zod_1.z
        .number()
        .int("Grammage must be an integer")
        .positive("Grammage must be a positive number")
        .optional(),
    imageUrl: zod_1.z
        .string()
        .url("Invalid image URL format")
        .trim()
        .optional(),
    tagIds: zod_1.z.array(zod_1.z.string().min(24, "Invalid tag ID").max(24, "Invalid tag ID")).optional(),
    // Stock related fields (optional for product creation)
    stockId: zod_1.z
        .string()
        .min(1, "Stock ID is required if creating stock")
        .optional(),
    manufacturingDate: zod_1.z
        .string()
        .datetime("Invalid manufacturing date format")
        .optional(),
    arrivalDate: zod_1.z
        .string()
        .datetime("Invalid arrival date format")
        .optional(),
    validityMonths: zod_1.z
        .number()
        .int("Validity months must be an integer")
        .min(1, "Validity months must be at least 1")
        .optional(),
    supplierName: zod_1.z
        .string()
        .max(200, "Supplier name must be at most 200 characters long")
        .trim()
        .optional(),
    supplierId: zod_1.z
        .string()
        .min(24, "Invalid supplier ID")
        .max(24, "Invalid supplier ID")
        .optional(),
    stockQuantity: zod_1.z
        .number()
        .int("Stock quantity must be an integer")
        .min(0, "Stock quantity cannot be negative")
        .optional(),
});
exports.UpdateProductSchema = exports.CreateProductSchema.partial();
exports.ProductQuerySchema = zod_1.z.object({
    page: zod_1.z.string().optional().transform(val => val ? parseInt(val) : 1),
    limit: zod_1.z.string().optional().transform(val => val ? parseInt(val) : 10),
    search: zod_1.z.string().optional(),
    categoryId: zod_1.z.string().optional(),
    minPrice: zod_1.z.string().optional().transform(val => val ? parseInt(val) : undefined),
    maxPrice: zod_1.z.string().optional().transform(val => val ? parseInt(val) : undefined),
});
//# sourceMappingURL=productForm.schema.js.map