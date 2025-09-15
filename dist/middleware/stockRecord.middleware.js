"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateStockBatchId = exports.validateProductId = exports.validateStockRecordId = exports.validateStockRecordQuery = exports.validateUpdateStockRecord = exports.validateCreateStockRecord = void 0;
const stockRecordForm_schema_1 = require("../libs/schemas/stockRecordForm.schema");
const zod_1 = __importDefault(require("zod"));
const validateCreateStockRecord = (req, res, next) => {
    try {
        stockRecordForm_schema_1.CreateStockRecordSchema.parse(req.body);
    }
    catch (error) {
        if (error instanceof zod_1.default.ZodError) {
            console.error("Create Stock Record Validation error:\n", error);
            res.status(400).json({ message: error });
            return;
        }
        res.status(500).json({ message: "Internal server error" });
        return;
    }
    next();
};
exports.validateCreateStockRecord = validateCreateStockRecord;
const validateUpdateStockRecord = (req, res, next) => {
    try {
        stockRecordForm_schema_1.UpdateStockRecordSchema.parse(req.body);
    }
    catch (error) {
        if (error instanceof zod_1.default.ZodError) {
            console.error("Update Stock Record Validation error:\n", error);
            res.status(400).json({ message: error });
            return;
        }
        res.status(500).json({ message: "Internal server error" });
        return;
    }
    next();
};
exports.validateUpdateStockRecord = validateUpdateStockRecord;
const validateStockRecordQuery = (req, res, next) => {
    try {
        stockRecordForm_schema_1.StockRecordQuerySchema.parse(req.query);
    }
    catch (error) {
        if (error instanceof zod_1.default.ZodError) {
            console.error("Stock Record Query Validation error:\n", error);
            res.status(400).json({ message: error });
            return;
        }
        res.status(500).json({ message: "Internal server error" });
        return;
    }
    next();
};
exports.validateStockRecordQuery = validateStockRecordQuery;
const validateStockRecordId = (req, res, next) => {
    try {
        const schema = zod_1.default.object({
            id: zod_1.default
                .string()
                .min(24, "Invalid stock record ID")
                .max(24, "Invalid stock record ID"),
        });
        schema.parse(req.params);
    }
    catch (error) {
        if (error instanceof zod_1.default.ZodError) {
            console.error("Stock Record ID Validation error:\n", error);
            res.status(400).json({ message: error });
            return;
        }
        res.status(500).json({ message: "Internal server error" });
        return;
    }
    next();
};
exports.validateStockRecordId = validateStockRecordId;
const validateProductId = (req, res, next) => {
    try {
        const schema = zod_1.default.object({
            productId: zod_1.default
                .string()
                .min(24, "Invalid product ID")
                .max(24, "Invalid product ID"),
        });
        schema.parse(req.params);
    }
    catch (error) {
        if (error instanceof zod_1.default.ZodError) {
            console.error("Product ID Validation error:\n", error);
            res.status(400).json({ message: error });
            return;
        }
        res.status(500).json({ message: "Internal server error" });
        return;
    }
    next();
};
exports.validateProductId = validateProductId;
const validateStockBatchId = (req, res, next) => {
    try {
        const schema = zod_1.default.object({
            stockBatchId: zod_1.default
                .string()
                .min(24, "Invalid stock batch ID")
                .max(24, "Invalid stock batch ID"),
        });
        schema.parse(req.params);
    }
    catch (error) {
        if (error instanceof zod_1.default.ZodError) {
            console.error("Stock Batch ID Validation error:\n", error);
            res.status(400).json({ message: error });
            return;
        }
        res.status(500).json({ message: "Internal server error" });
        return;
    }
    next();
};
exports.validateStockBatchId = validateStockBatchId;
//# sourceMappingURL=stockRecord.middleware.js.map