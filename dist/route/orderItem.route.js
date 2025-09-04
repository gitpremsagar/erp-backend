"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const orderItem_controller_1 = require("../controller/orderItem.controller");
const orderItem_middleware_1 = require("../middleware/orderItem.middleware");
const router = express_1.default.Router();
// Protected routes - require authentication
// router.use(validateAccessToken);
// Create a new order item
router.post("/", orderItem_middleware_1.validateCreateOrderItem, orderItem_controller_1.createOrderItem);
// Get all order items with pagination and filtering
router.get("/", orderItem_middleware_1.validateOrderItemQuery, orderItem_controller_1.getOrderItems);
// Get order item statistics
router.get("/stats", orderItem_controller_1.getOrderItemStats);
// Get a histor of product by product id
router.get("/product-order-history/:productId", orderItem_controller_1.getProducOrderHistory);
// Get a history of product order by customer id and product id
router.get("/customer-product-order-history/:customerId/:productId", orderItem_controller_1.getCustomerProductOrderHistory);
// Update an order item
router.put("/:id", orderItem_middleware_1.validateUpdateOrderItem, orderItem_controller_1.updateOrderItem);
// Delete an order item
router.delete("/:id", orderItem_controller_1.deleteOrderItem);
exports.default = router;
//# sourceMappingURL=orderItem.route.js.map