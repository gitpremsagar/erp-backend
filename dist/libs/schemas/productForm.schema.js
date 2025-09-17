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