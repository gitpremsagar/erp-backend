"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSupplierQuery = exports.validateUpdateSupplier = exports.validateCreateSupplier = void 0;
const supplierForm_schema_1 = require("../libs/schemas/supplierForm.schema");
const zod_1 = __importDefault(require("zod"));
const validateCreateSupplier = (req, res, next) => {
    try {
        supplierForm_schema_1.CreateSupplierSchema.parse(req.body);
    }
    catch (error) {
        if (error instanceof zod_1.default.ZodError) {
            console.error("Create Supplier Validation error:\n", error);
            res.status(400).json({ message: error });
            return;
        }
        res.status(500).json({ message: "Internal server error" });
        return;
    }
    next();
};
exports.validateCreateSupplier = validateCreateSupplier;
const validateUpdateSupplier = (req, res, next) => {
    try {
        supplierForm_schema_1.UpdateSupplierSchema.parse(req.body);
    }
    catch (error) {
        if (error instanceof zod_1.default.ZodError) {
            console.error("Update Supplier Validation error:\n", error);
            res.status(400).json({ message: error });
            return;
        }
        res.status(500).json({ message: "Internal server error" });
        return;
    }
    next();
};
exports.validateUpdateSupplier = validateUpdateSupplier;
const validateSupplierQuery = (req, res, next) => {
    try {
        supplierForm_schema_1.SupplierQuerySchema.parse(req.query);
    }
    catch (error) {
        if (error instanceof zod_1.default.ZodError) {
            console.error("Supplier Query Validation error:\n", error);
            res.status(400).json({ message: error });
            return;
        }
        res.status(500).json({ message: "Internal server error" });
        return;
    }
    next();
};
exports.validateSupplierQuery = validateSupplierQuery;
//# sourceMappingURL=supplier.middleware.js.map