"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateProductTagQuery = exports.validateUpdateProductTag = exports.validateCreateProductTag = void 0;
const productTagForm_schema_1 = require("../libs/schemas/productTagForm.schema");
const zod_1 = __importDefault(require("zod"));
const validateCreateProductTag = (req, res, next) => {
    try {
        productTagForm_schema_1.CreateProductTagSchema.parse(req.body);
    }
    catch (error) {
        if (error instanceof zod_1.default.ZodError) {
            console.error("Create ProductTag Validation error:\n", error);
            res.status(400).json({ message: error });
            return;
        }
        res.status(500).json({ message: "Internal server error" });
        return;
    }
    next();
};
exports.validateCreateProductTag = validateCreateProductTag;
const validateUpdateProductTag = (req, res, next) => {
    try {
        productTagForm_schema_1.UpdateProductTagSchema.parse(req.body);
    }
    catch (error) {
        if (error instanceof zod_1.default.ZodError) {
            console.error("Update ProductTag Validation error:\n", error);
            res.status(400).json({ message: error });
            return;
        }
        res.status(500).json({ message: "Internal server error" });
        return;
    }
    next();
};
exports.validateUpdateProductTag = validateUpdateProductTag;
const validateProductTagQuery = (req, res, next) => {
    try {
        productTagForm_schema_1.ProductTagQuerySchema.parse(req.query);
    }
    catch (error) {
        if (error instanceof zod_1.default.ZodError) {
            console.error("ProductTag Query Validation error:\n", error);
            res.status(400).json({ message: error });
            return;
        }
        res.status(500).json({ message: "Internal server error" });
        return;
    }
    next();
};
exports.validateProductTagQuery = validateProductTagQuery;
//# sourceMappingURL=productTag.middleware.js.map