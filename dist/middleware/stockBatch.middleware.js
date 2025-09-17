"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateProductId = exports.validateToggleArchive = exports.validateStockBatchQuery = exports.validateUpdateStockBatch = exports.validateCreateStockBatch = void 0;
const stockBatchForm_schema_1 = require("../libs/schemas/stockBatchForm.schema");
const zod_1 = __importDefault(require("zod"));
const validateCreateStockBatch = (req, res, next) => {
    try {
        stockBatchForm_schema_1.CreateStockBatchSchema.parse(req.body);
    }
    catch (error) {
        if (error instanceof zod_1.default.ZodError) {
            console.error("Create Stock Validation error:\n", error);
            res.status(400).json({ message: error });
            return;
        }
        res.status(500).json({ message: "Internal server error" });
        return;
    }
    next();
};
exports.validateCreateStockBatch = validateCreateStockBatch;
const validateUpdateStockBatch = (req, res, next) => {
    try {
        stockBatchForm_schema_1.UpdateStockBatchSchema.parse(req.body);
    }
    catch (error) {
        if (error instanceof zod_1.default.ZodError) {
            console.error("Update Stock Validation error:\n", error);
            res.status(400).json({ message: error });
            return;
        }
        res.status(500).json({ message: "Internal server error" });
        return;
    }
    next();
};
exports.validateUpdateStockBatch = validateUpdateStockBatch;
const validateStockBatchQuery = (req, res, next) => {
    try {
        stockBatchForm_schema_1.StockBatchQuerySchema.parse(req.query);
    }
    catch (error) {
        if (error instanceof zod_1.default.ZodError) {
            console.error("Stock Query Validation error:\n", error);
            res.status(400).json({ message: error });
            return;
        }
        res.status(500).json({ message: "Internal server error" });
        return;
    }
    next();
};
exports.validateStockBatchQuery = validateStockBatchQuery;
const validateToggleArchive = (req, res, next) => {
    try {
        const schema = zod_1.default.object({
            isArchived: zod_1.default.boolean(),
        });
        schema.parse(req.body);
    }
    catch (error) {
        if (error instanceof zod_1.default.ZodError) {
            console.error("Toggle Archive Validation error:\n", error);
            res.status(400).json({ message: error });
            return;
        }
        res.status(500).json({ message: "Internal server error" });
        return;
    }
    next();
};
exports.validateToggleArchive = validateToggleArchive;
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
//# sourceMappingURL=stockBatch.middleware.js.map