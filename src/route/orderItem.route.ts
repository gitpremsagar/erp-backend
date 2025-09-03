import express from "express";
import {
  createOrderItem,
  getOrderItems,
  getOrderItemById,
  updateOrderItem,
  deleteOrderItem,
  getOrderItemStats,
} from "../controller/orderItem.controller";
import {
  validateCreateOrderItem,
  validateUpdateOrderItem,
  validateOrderItemQuery,
} from "../middleware/orderItem.middleware";
import { validateAccessToken } from "../middleware/auth.middleware";

const router = express.Router();

// Protected routes - require authentication
// router.use(validateAccessToken);

// Create a new order item
router.post("/", validateCreateOrderItem, createOrderItem);

// Get all order items with pagination and filtering
router.get("/", validateOrderItemQuery, getOrderItems);

// Get order item statistics
router.get("/stats", getOrderItemStats);

// Get a single order item by ID
router.get("/:id", getOrderItemById);

// Update an order item
router.put("/:id", validateUpdateOrderItem, updateOrderItem);

// Delete an order item
router.delete("/:id", deleteOrderItem);

export default router;
