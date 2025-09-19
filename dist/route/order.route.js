"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const order_controller_1 = require("../controller/order.controller");
const order_middleware_1 = require("../middleware/order.middleware");
const orderItem_controller_1 = require("../controller/orderItem.controller");
const router = express_1.default.Router();
// Protected routes - require authentication
// router.use(validateAccessToken);
// Create a new order
router.post("/", order_middleware_1.validateCreateOrder, order_controller_1.createOrder);
// Get all orders with pagination and filtering
router.get("/", order_middleware_1.validateOrderQuery, order_controller_1.getOrders);
// Get order statistics
router.get("/stats", order_controller_1.getOrderStats);
// Get a single order by ID
router.get("/:orderId", order_controller_1.getOrderById);
// Get a single order by custom order ID
router.get("/custom/:customOrderId", order_controller_1.getOrderByCustomOrderId);
// Get order history by customer ID and product ID
router.get("/customer-product-order-history/:customerId/:productId", orderItem_controller_1.getCustomerProductOrderHistory);
// Get orders by original order ID
router.get("/original/:originalOrderId", order_middleware_1.validateOrderQuery, order_controller_1.getOrdersByOriginalOrderId);
// Update an order
router.put("/:orderId", order_middleware_1.validateUpdateOrder, order_controller_1.updateOrder);
// Delete an order
router.delete("/:orderId", order_controller_1.deleteOrder);
exports.default = router;
//# sourceMappingURL=order.route.js.map