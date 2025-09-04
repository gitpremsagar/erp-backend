"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateOrderItemQuery = exports.validateUpdateOrderItem = exports.validateCreateOrderItem = void 0;
const orderItemForm_schema_1 = require("../libs/schemas/orderItemForm.schema");
const zod_1 = __importDefault(require("zod"));
const validateCreateOrderItem = (req, res, next) => {
    try {
        orderItemForm_schema_1.CreateOrderItemSchema.parse(req.body);
    }
    catch (error) {
        if (error instanceof zod_1.default.ZodError) {
            console.error("Create OrderItem Validation error:\n", error);
            res.status(400).json({ message: error });
            return;
        }
        res.status(500).json({ message: "Internal server error" });
        return;
    }
    next();
};
exports.validateCreateOrderItem = validateCreateOrderItem;
const validateUpdateOrderItem = (req, res, next) => {
    try {
        orderItemForm_schema_1.UpdateOrderItemSchema.parse(req.body);
    }
    catch (error) {
        if (error instanceof zod_1.default.ZodError) {
            console.error("Update OrderItem Validation error:\n", error);
            res.status(400).json({ message: error });
            return;
        }
        res.status(500).json({ message: "Internal server error" });
        return;
    }
    next();
};
exports.validateUpdateOrderItem = validateUpdateOrderItem;
const validateOrderItemQuery = (req, res, next) => {
    try {
        orderItemForm_schema_1.OrderItemQuerySchema.parse(req.query);
    }
    catch (error) {
        if (error instanceof zod_1.default.ZodError) {
            console.error("OrderItem Query Validation error:\n", error);
            res.status(400).json({ message: error });
            return;
        }
        res.status(500).json({ message: "Internal server error" });
        return;
    }
    next();
};
exports.validateOrderItemQuery = validateOrderItemQuery;
//# sourceMappingURL=orderItem.middleware.js.map