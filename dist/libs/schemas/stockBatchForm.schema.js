"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockBatchQuerySchema = exports.UpdateStockBatchSchema = exports.CreateStockBatchSchema = void 0;
const zod_1 = require("zod");
exports.CreateStockBatchSchema = zod_1.z.object({
    productId: zod_1.z
        .string()
        .min(24, "Invalid product ID")
        .max(24, "Invalid product ID"),
    manufacturingDate: zod_1.z
        .string()
        .refine((date) => {
        // Accept various date formats: ISO datetime, date only, or common formats
        const dateObj = new Date(date);
        return !isNaN(dateObj.getTime());
    }, "Invalid manufacturing date format"),
    arrivalDate: zod_1.z
        .string()
        .refine((date) => {
        // Accept various date formats: ISO datetime, date only, or common formats
        const dateObj = new Date(date);
        return !isNaN(dateObj.getTime());
    }, "Invalid arrival date format"),
    validityMonths: zod_1.z
        .number()
        .int("Validity months must be an integer")
        .min(1, "Validity months must be at least 1")
        .default(10),
    supplierName: zod_1.z
        .string()
        .max(200, "Supplier name must be at most 200 characters long")
        .trim()
        .optional(),
    supplierId: zod_1.z
        .string()
        .min(24, "Invalid supplier ID")
        .max(24, "Invalid supplier ID")
        .optional()
        .nullable(),
    stockQuantity: zod_1.z
        .number()
        .int("Stock quantity must be an integer")
        .min(0, "Stock quantity cannot be negative")
        .default(0),
    isArchived: zod_1.z
        .boolean()
        .default(false)
        .optional(),
});
exports.UpdateStockBatchSchema = exports.CreateStockBatchSchema.partial();
exports.StockBatchQuerySchema = zod_1.z.object({
    page: zod_1.z.string().optional().transform(val => val ? parseInt(val) : 1),
    limit: zod_1.z.string().optional().transform(val => val ? parseInt(val) : 10),
    search: zod_1.z.string().optional(),
    productId: zod_1.z.string().optional(),
    supplierName: zod_1.z.string().optional(),
    isArchived: zod_1.z.string().optional().transform(val => val === 'true' ? true : val === 'false' ? false : undefined),
    expired: zod_1.z.string().optional().transform(val => val === 'true' ? true : val === 'false' ? false : undefined),
    lowStock: zod_1.z.string().optional().transform(val => val === 'true' ? true : val === 'false' ? false : undefined),
});
//# sourceMappingURL=stockBatchForm.schema.js.map