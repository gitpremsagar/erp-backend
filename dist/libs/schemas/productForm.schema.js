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
    description: zod_1.z
        .string()
        .min(1, "Description is required")
        .max(1000, "Description must be at most 1000 characters long")
        .trim(),
    expiryDate: zod_1.z.string().datetime("Invalid expiry date format"),
    validity: zod_1.z
        .string()
        .min(1, "Validity is required")
        .max(100, "Validity must be at most 100 characters long")
        .trim(),
    stock: zod_1.z
        .number()
        .int("Stock must be an integer")
        .min(0, "Stock cannot be negative"),
    stockEntryDate: zod_1.z.string().datetime("Invalid stock entry date format"),
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
    lowStockAlertColor: zod_1.z
        .string()
        .regex(/^#[0-9A-Fa-f]{6}$/, "Invalid color format. Use hex color code (e.g., #FF0000)")
        .optional(),
    lowStockAlertMessage: zod_1.z
        .string()
        .max(100, "Low stock alert message must be at most 100 characters long")
        .optional(),
    overStockAlertColor: zod_1.z
        .string()
        .regex(/^#[0-9A-Fa-f]{6}$/, "Invalid color format. Use hex color code (e.g., #FF0000)")
        .optional(),
    overStockAlertMessage: zod_1.z
        .string()
        .max(100, "Over stock alert message must be at most 100 characters long")
        .optional(),
    inStockAlertColor: zod_1.z
        .string()
        .regex(/^#[0-9A-Fa-f]{6}$/, "Invalid color format. Use hex color code (e.g., #FF0000)")
        .optional(),
    inStockAlertMessage: zod_1.z
        .string()
        .max(100, "In stock alert message must be at most 100 characters long")
        .optional(),
    expiryAlertDays: zod_1.z
        .number()
        .int("Expiry alert days must be an integer")
        .min(0, "Expiry alert days cannot be negative")
        .optional(),
    expiryAlertColor: zod_1.z
        .string()
        .regex(/^#[0-9A-Fa-f]{6}$/, "Invalid color format. Use hex color code (e.g., #FF0000)")
        .optional(),
    expiryAlertMessage: zod_1.z
        .string()
        .max(100, "Expiry alert message must be at most 100 characters long")
        .optional(),
    tags: zod_1.z.array(zod_1.z.string().trim()).optional(),
    imageUrl: zod_1.z
        .string()
        .url("Invalid image URL format")
        .trim(),
    categoryId: zod_1.z
        .string()
        .min(24, "Invalid category ID")
        .max(24, "Invalid category ID"),
    groupId: zod_1.z
        .string()
        .min(24, "Invalid group ID")
        .max(24, "Invalid group ID"),
    subCategoryId: zod_1.z
        .string()
        .min(24, "Invalid sub-category ID")
        .max(24, "Invalid sub-category ID"),
    grammage: zod_1.z
        .number()
        .int("Grammage must be an integer")
        .positive("Grammage must be a positive number"),
});
exports.UpdateProductSchema = exports.CreateProductSchema.partial();
exports.ProductQuerySchema = zod_1.z.object({
    page: zod_1.z.string().optional().transform(val => val ? parseInt(val) : 1),
    limit: zod_1.z.string().optional().transform(val => val ? parseInt(val) : 10),
    search: zod_1.z.string().optional(),
    categoryId: zod_1.z.string().optional(),
    groupId: zod_1.z.string().optional(),
    subCategoryId: zod_1.z.string().optional(),
    minPrice: zod_1.z.string().optional().transform(val => val ? parseInt(val) : undefined),
    maxPrice: zod_1.z.string().optional().transform(val => val ? parseInt(val) : undefined),
});
//# sourceMappingURL=productForm.schema.js.map