"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderItemQuerySchema = exports.UpdateOrderItemSchema = exports.CreateOrderItemSchema = void 0;
const zod_1 = require("zod");
exports.CreateOrderItemSchema = zod_1.z.object({
    orderId: zod_1.z
        .string()
        .min(24, "Invalid order ID")
        .max(24, "Invalid order ID"),
    productId: zod_1.z
        .string()
        .min(24, "Invalid product ID")
        .max(24, "Invalid product ID"),
    quantity: zod_1.z
        .number()
        .int("Quantity must be an integer")
        .positive("Quantity must be a positive number"),
    customerId: zod_1.z
        .string()
        .min(24, "Invalid customer ID")
        .max(24, "Invalid customer ID"),
    deliveryDate: zod_1.z.date("Invalid delivery date format").optional(),
    orderCompleted: zod_1.z.boolean().optional().default(false),
});
exports.UpdateOrderItemSchema = exports.CreateOrderItemSchema.partial();
exports.OrderItemQuerySchema = zod_1.z.object({
    page: zod_1.z.string().optional().transform(val => val ? parseInt(val) : 1),
    limit: zod_1.z.string().optional().transform(val => val ? parseInt(val) : 10),
    orderId: zod_1.z.string().optional(),
    productId: zod_1.z.string().optional(),
    customerId: zod_1.z.string().optional(),
    orderCompleted: zod_1.z.string().optional().transform(val => val === 'true'),
});
//# sourceMappingURL=orderItemForm.schema.js.map