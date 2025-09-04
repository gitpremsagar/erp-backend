"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCustomerQuery = exports.validateUpdateCustomer = exports.validateCreateCustomer = void 0;
const customerForm_schema_1 = require("../libs/schemas/customerForm.schema");
const zod_1 = __importDefault(require("zod"));
const validateCreateCustomer = (req, res, next) => {
    try {
        customerForm_schema_1.CreateCustomerSchema.parse(req.body);
    }
    catch (error) {
        if (error instanceof zod_1.default.ZodError) {
            console.error("Create Customer Validation error:\n", error);
            res.status(400).json({ message: error });
            return;
        }
        res.status(500).json({ message: "Internal server error" });
        return;
    }
    next();
};
exports.validateCreateCustomer = validateCreateCustomer;
const validateUpdateCustomer = (req, res, next) => {
    try {
        customerForm_schema_1.UpdateCustomerSchema.parse(req.body);
    }
    catch (error) {
        if (error instanceof zod_1.default.ZodError) {
            console.error("Update Customer Validation error:\n", error);
            res.status(400).json({ message: error });
            return;
        }
        res.status(500).json({ message: "Internal server error" });
        return;
    }
    next();
};
exports.validateUpdateCustomer = validateUpdateCustomer;
const validateCustomerQuery = (req, res, next) => {
    try {
        customerForm_schema_1.CustomerQuerySchema.parse(req.query);
    }
    catch (error) {
        if (error instanceof zod_1.default.ZodError) {
            console.error("Customer Query Validation error:\n", error);
            res.status(400).json({ message: error });
            return;
        }
        res.status(500).json({ message: "Internal server error" });
        return;
    }
    next();
};
exports.validateCustomerQuery = validateCustomerQuery;
//# sourceMappingURL=customer.middleware.js.map