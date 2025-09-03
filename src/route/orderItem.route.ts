import express from "express";
import {
  createOrderItem,
  getOrderItems,
  getProducOrderHistory,
  updateOrderItem,
  deleteOrderItem,
  getOrderItemStats,
  getCustomerProductOrderHistory,
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

// Get a histor of product by product id
router.get("/product-order-history/:productId", getProducOrderHistory);

// Get a history of product order by customer id and product id
router.get("/customer-product-order-history/:customerId/:productId", getCustomerProductOrderHistory);

// Update an order item
router.put("/:id", validateUpdateOrderItem, updateOrderItem);

// Delete an order item
router.delete("/:id", deleteOrderItem);

export default router;
