"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockRecordQuerySchema = exports.UpdateStockRecordSchema = exports.CreateStockRecordSchema = void 0;
const zod_1 = require("zod");
exports.CreateStockRecordSchema = zod_1.z.object({
    productId: zod_1.z
        .string()
        .min(24, "Invalid product ID")
        .max(24, "Invalid product ID"),
    stockBatchId: zod_1.z
        .string()
        .min(24, "Invalid stock batch ID")
        .max(24, "Invalid stock batch ID"),
    changeInStock: zod_1.z
        .number()
        .int("Change in stock must be an integer")
        .refine((val) => val !== 0, "Change in stock cannot be zero"),
    reason: zod_1.z.enum([
        "ARRIVAL_FROM_SUPPLIER",
        "DELIVERED_TO_CUSTOMER",
        "CORRECTION_BY_ADMIN"
    ], {
        message: "Invalid reason. Must be one of: ARRIVAL_FROM_SUPPLIER, DELIVERED_TO_CUSTOMER, CORRECTION_BY_ADMIN"
    }),
    createdBy: zod_1.z
        .string()
        .min(24, "Invalid user ID")
        .max(24, "Invalid user ID"),
});
exports.UpdateStockRecordSchema = zod_1.z.object({
    changeInStock: zod_1.z
        .number()
        .int("Change in stock must be an integer")
        .refine((val) => val !== 0, "Change in stock cannot be zero")
        .optional(),
    reason: zod_1.z.enum([
        "ARRIVAL_FROM_SUPPLIER",
        "DELIVERED_TO_CUSTOMER",
        "CORRECTION_BY_ADMIN"
    ], {
        message: "Invalid reason. Must be one of: ARRIVAL_FROM_SUPPLIER, DELIVERED_TO_CUSTOMER, CORRECTION_BY_ADMIN"
    }).optional(),
}).partial();
exports.StockRecordQuerySchema = zod_1.z.object({
    page: zod_1.z.string().optional().transform(val => val ? parseInt(val) : 1),
    limit: zod_1.z.string().optional().transform(val => val ? parseInt(val) : 10),
    search: zod_1.z.string().optional(),
    productId: zod_1.z.string().optional(),
    stockBatchId: zod_1.z.string().optional(),
    reason: zod_1.z.enum([
        "ARRIVAL_FROM_SUPPLIER",
        "DELIVERED_TO_CUSTOMER",
        "CORRECTION_BY_ADMIN"
    ]).optional(),
    createdBy: zod_1.z.string().optional(),
    dateFrom: zod_1.z.string().optional().refine((date) => {
        if (!date)
            return true;
        const dateObj = new Date(date);
        return !isNaN(dateObj.getTime());
    }, "Invalid date format"),
    dateTo: zod_1.z.string().optional().refine((date) => {
        if (!date)
            return true;
        const dateObj = new Date(date);
        return !isNaN(dateObj.getTime());
    }, "Invalid date format"),
});
//# sourceMappingURL=stockRecordForm.schema.js.map