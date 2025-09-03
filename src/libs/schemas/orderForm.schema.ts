import { z } from "zod";

export const CreateOrderSchema = z.object({
  customerId: z
    .string()
    .min(24, "Invalid customer ID")
    .max(24, "Invalid customer ID"),
  totalPrice: z
    .number()
    .positive("Total price must be a positive number")
    .int("Total price must be an integer")
    .optional(),
  vehicleId: z
    .string()
    .min(24, "Invalid vehicle ID")
    .max(24, "Invalid vehicle ID")
    .optional(),
  deliveryAddressId: z
    .string()
    .min(24, "Invalid delivery address ID")
    .max(24, "Invalid delivery address ID")
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
  })).min(1, "At least one order item is required"),
});

export const UpdateOrderSchema = z.object({
  status: z.enum(["PENDING", "MODIFYING", "PACKING", "SHIPPING", "DELIVERED", "COMPLETED"]).optional(),
  totalPrice: z
    .number()
    .positive("Total price must be a positive number")
    .int("Total price must be an integer")
    .optional(),
  customerId: z
    .string()
    .min(24, "Invalid customer ID")
    .max(24, "Invalid customer ID")
    .optional(),
  vehicleId: z
    .string()
    .min(24, "Invalid vehicle ID")
    .max(24, "Invalid vehicle ID")
    .optional(),
  deliveryAddressId: z
    .string()
    .min(24, "Invalid delivery address ID")
    .max(24, "Invalid delivery address ID")
    .optional(),
  originalOrderId: z
    .string()
    .min(24, "Invalid original order ID")
    .max(24, "Invalid original order ID")
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
