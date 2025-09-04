"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateOrderQuery = exports.validateUpdateOrder = exports.validateCreateOrder = void 0;
const orderForm_schema_1 = require("../libs/schemas/orderForm.schema");
const zod_1 = __importDefault(require("zod"));
const validateCreateOrder = (req, res, next) => {
    try {
        orderForm_schema_1.CreateOrderSchema.parse(req.body);
    }
    catch (error) {
        if (error instanceof zod_1.default.ZodError) {
            console.error("Create Order Validation error:\n", error);
            res.status(400).json({ message: error });
            return;
        }
        res.status(500).json({ message: "Internal server error" });
        return;
    }
    next();
};
exports.validateCreateOrder = validateCreateOrder;
const validateUpdateOrder = (req, res, next) => {
    try {
        orderForm_schema_1.UpdateOrderSchema.parse(req.body);
    }
    catch (error) {
        if (error instanceof zod_1.default.ZodError) {
            console.error("Update Order Validation error:\n", error);
            res.status(400).json({ message: error });
            return;
        }
        res.status(500).json({ message: "Internal server error" });
        return;
    }
    next();
};
exports.validateUpdateOrder = validateUpdateOrder;
const validateOrderQuery = (req, res, next) => {
    try {
        orderForm_schema_1.OrderQuerySchema.parse(req.query);
    }
    catch (error) {
        if (error instanceof zod_1.default.ZodError) {
            console.error("Order Query Validation error:\n", error);
            res.status(400).json({ message: error });
            return;
        }
        res.status(500).json({ message: "Internal server error" });
        return;
    }
    next();
};
exports.validateOrderQuery = validateOrderQuery;
//# sourceMappingURL=order.middleware.js.map