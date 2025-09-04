"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const customer_controller_1 = require("../controller/customer.controller");
const customer_middleware_1 = require("../middleware/customer.middleware");
const router = express_1.default.Router();
// Protected routes - require authentication
// router.use(validateAccessToken);
// Create a new customer
router.post("/", customer_middleware_1.validateCreateCustomer, customer_controller_1.createCustomer);
// Get all customers with pagination and search
router.get("/", customer_middleware_1.validateCustomerQuery, customer_controller_1.getCustomers);
// Get customer statistics
router.get("/stats", customer_controller_1.getCustomerStats);
// Get a single customer by ID
router.get("/:id", customer_controller_1.getCustomerById);
// Update a customer
router.put("/:id", customer_middleware_1.validateUpdateCustomer, customer_controller_1.updateCustomer);
// Delete a customer
router.delete("/:id", customer_controller_1.deleteCustomer);
exports.default = router;
//# sourceMappingURL=customer.route.js.map