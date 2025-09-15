"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderQuerySchema = exports.UpdateOrderSchema = exports.CreateOrderSchema = void 0;
const zod_1 = require("zod");
exports.CreateOrderSchema = zod_1.z.object({
    customerId: zod_1.z
        .string()
        .min(24, "Invalid customer ID")
        .max(24, "Invalid customer ID"),
    totalPrice: zod_1.z
        .number()
        .positive("Total price must be a positive number")
        .int("Total price must be an integer")
        .optional(),
    vehicleId: zod_1.z
        .string()
        .min(1, "Invalid vehicle ID")
        .max(24, "Invalid vehicle ID")
        .optional(),
    deliveryAddressId: zod_1.z
        .string()
        .min(24, "Invalid delivery address ID")
        .max(24, "Invalid delivery address ID")
        .optional(),
    originalOrderId: zod_1.z
        .string()
        .min(24, "Invalid original order ID")
        .max(24, "Invalid original order ID")
        .optional(),
    stockRecordId: zod_1.z
        .string()
        .min(24, "Invalid stock record ID")
        .max(24, "Invalid stock record ID")
        .optional(),
    orderItems: zod_1.z.array(zod_1.z.object({
        productId: zod_1.z
            .string()
            .min(24, "Invalid product ID")
            .max(24, "Invalid product ID"),
        quantity: zod_1.z
            .number()
            .int("Quantity must be an integer")
            .positive("Quantity must be positive"),
    })).min(1, "At least one order item is required"),
});
exports.UpdateOrderSchema = zod_1.z.object({
    status: zod_1.z.enum(["PENDING", "MODIFYING", "PACKING", "SHIPPING", "DELIVERED", "COMPLETED"]).optional(),
    totalPrice: zod_1.z
        .number()
        .positive("Total price must be a positive number")
        .int("Total price must be an integer")
        .optional(),
    customerId: zod_1.z
        .string()
        .min(24, "Invalid customer ID")
        .max(24, "Invalid customer ID")
        .optional(),
    vehicleId: zod_1.z
        .string()
        .min(24, "Invalid vehicle ID")
        .max(24, "Invalid vehicle ID")
        .optional(),
    deliveryAddressId: zod_1.z
        .string()
        .min(24, "Invalid delivery address ID")
        .max(24, "Invalid delivery address ID")
        .optional(),
    originalOrderId: zod_1.z
        .string()
        .min(24, "Invalid original order ID")
        .max(24, "Invalid original order ID")
        .optional(),
    stockRecordId: zod_1.z
        .string()
        .min(24, "Invalid stock record ID")
        .max(24, "Invalid stock record ID")
        .optional(),
    orderItems: zod_1.z.array(zod_1.z.object({
        productId: zod_1.z
            .string()
            .min(24, "Invalid product ID")
            .max(24, "Invalid product ID"),
        quantity: zod_1.z
            .number()
            .int("Quantity must be an integer")
            .positive("Quantity must be positive"),
    })).min(1, "At least one order item is required").optional(),
});
exports.OrderQuerySchema = zod_1.z.object({
    page: zod_1.z.string().regex(/^\d+$/).transform(Number).optional(),
    limit: zod_1.z.string().regex(/^\d+$/).transform(Number).optional(),
    status: zod_1.z.enum(["PENDING", "MODIFYING", "PACKING", "SHIPPING", "DELIVERED", "COMPLETED"]).optional(),
    customerId: zod_1.z.string().min(24).max(24).optional(),
    startDate: zod_1.z.string().refine((date) => {
        const dateObj = new Date(date);
        return !isNaN(dateObj.getTime());
    }, "Invalid start date format").optional(),
    endDate: zod_1.z.string().refine((date) => {
        const dateObj = new Date(date);
        return !isNaN(dateObj.getTime());
    }, "Invalid end date format").optional(),
});
//# sourceMappingURL=orderForm.schema.js.map