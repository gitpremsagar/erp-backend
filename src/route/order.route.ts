import express from "express";
import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
  getOrderStats,
} from "../controller/order.controller";
import {
  validateCreateOrder,
  validateUpdateOrder,
  validateOrderQuery,
} from "../middleware/order.middleware";
import { validateAccessToken } from "../middleware/auth.middleware";

const router = express.Router();

// Protected routes - require authentication
// router.use(validateAccessToken);

// Create a new order
router.post("/", validateCreateOrder, createOrder);

// Get all orders with pagination and filtering
router.get("/", validateOrderQuery, getOrders);

// Get order statistics
router.get("/stats", getOrderStats);

// Get a single order by ID
router.get("/:id", getOrderById);

// Update an order
router.put("/:id", validateUpdateOrder, updateOrder);

// Delete an order
router.delete("/:id", deleteOrder);

export default router;
