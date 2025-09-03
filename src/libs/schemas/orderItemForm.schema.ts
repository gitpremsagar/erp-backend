import { z } from "zod";

export const CreateOrderItemSchema = z.object({
  orderId: z
    .string()
    .min(24, "Invalid order ID")
    .max(24, "Invalid order ID"),
  productId: z
    .string()
    .min(24, "Invalid product ID")
    .max(24, "Invalid product ID"),
  quantity: z
    .number()
    .int("Quantity must be an integer")
    .positive("Quantity must be a positive number"),
  customerId: z
    .string()
    .min(24, "Invalid customer ID")
    .max(24, "Invalid customer ID"),
  deliveryDate: z.date("Invalid delivery date format").optional(),
  orderCompleted: z.boolean().optional().default(false),
});

export const UpdateOrderItemSchema = CreateOrderItemSchema.partial();

export const OrderItemQuerySchema = z.object({
  page: z.string().optional().transform(val => val ? parseInt(val) : 1),
  limit: z.string().optional().transform(val => val ? parseInt(val) : 10),
  orderId: z.string().optional(),
  productId: z.string().optional(),
  customerId: z.string().optional(),
  orderCompleted: z.string().optional().transform(val => val === 'true'),
});
