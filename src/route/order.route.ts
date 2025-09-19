import express from "express";
import {
  createOrder,
  getOrders,
  getOrderById,
  getOrderByCustomOrderId,
  getOrdersByOriginalOrderId,
  deleteOrder,
  getOrderStats,
  updateOrder,
} from "../controller/order.controller";
import {
  validateCreateOrder,
  validateUpdateOrder,
  validateOrderQuery,
} from "../middleware/order.middleware";
import { validateAccessToken } from "../middleware/auth.middleware";
import { getCustomerProductOrderHistory } from "../controller/orderItem.controller";

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
router.get("/:orderId", getOrderById);

// Get a single order by custom order ID
router.get("/custom/:customOrderId", getOrderByCustomOrderId);

// Get order history by customer ID and product ID
router.get("/customer-product-order-history/:customerId/:productId", getCustomerProductOrderHistory);

// Get orders by original order ID
router.get("/original/:originalOrderId", validateOrderQuery, getOrdersByOriginalOrderId);

// Update an order
router.put("/:orderId", validateUpdateOrder, updateOrder);



// Delete an order
router.delete("/:orderId", deleteOrder);

export default router;
