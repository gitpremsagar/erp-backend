import { z } from "zod";

export const CreateOrderSchema = z.object({
  customerId: z
    .string()
    .min(24, "Invalid customer ID")
    .max(24, "Invalid customer ID"),
  totalPrice: z
    .number()
    .positive("Total price must be a positive number")
    .int("Total price must be an integer"),
  orderItems: z.array(z.object({
    productId: z
      .string()
      .min(24, "Invalid product ID")
      .max(24, "Invalid product ID"),
    quantity: z
      .number()
      .int("Quantity must be an integer")
      .positive("Quantity must be positive"),
    grammage: z
      .number()
      .int("Grammage must be an integer")
      .positive("Grammage must be positive"),
  })).min(1, "At least one order item is required"),
});

export const UpdateOrderSchema = z.object({
  status: z.enum(["PENDING", "MODIFYING", "PACKING", "SHIPPING", "DELIVERED", "COMPLETED"]).optional(),
  totalPrice: z
    .number()
    .positive("Total price must be a positive number")
    .int("Total price must be an integer")
    .optional(),
  orderItems: z.array(z.object({
    productId: z
      .string()
      .min(24, "Invalid product ID")
      .max(24, "Invalid product ID"),
    quantity: z
      .number()
      .int("Quantity must be an integer")
      .positive("Quantity must be positive"),
    grammage: z
      .number()
      .int("Grammage must be an integer")
      .positive("Grammage must be positive"),
  })).min(1, "At least one order item is required").optional(),
});

export const OrderQuerySchema = z.object({
  page: z.string().regex(/^\d+$/).transform(Number).optional(),
  limit: z.string().regex(/^\d+$/).transform(Number).optional(),
  status: z.enum(["PENDING", "MODIFYING", "PACKING", "SHIPPING", "DELIVERED", "COMPLETED"]).optional(),
  customerId: z.string().min(24).max(24).optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
});
