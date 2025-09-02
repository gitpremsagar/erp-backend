"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateProductQuery = exports.validateUpdateProduct = exports.validateCreateProduct = void 0;
const productForm_schema_1 = require("../libs/schemas/productForm.schema");
const zod_1 = __importDefault(require("zod"));
const validateCreateProduct = (req, res, next) => {
    try {
        productForm_schema_1.CreateProductSchema.parse(req.body);
    }
    catch (error) {
        if (error instanceof zod_1.default.ZodError) {
            console.error("Create Product Validation error:\n", error);
            res.status(400).json({ message: error });
            return;
        }
        res.status(500).json({ message: "Internal server error" });
        return;
    }
    next();
};
exports.validateCreateProduct = validateCreateProduct;
const validateUpdateProduct = (req, res, next) => {
    try {
        productForm_schema_1.UpdateProductSchema.parse(req.body);
    }
    catch (error) {
        if (error instanceof zod_1.default.ZodError) {
            console.error("Update Product Validation error:\n", error);
            res.status(400).json({ message: error });
            return;
        }
        res.status(500).json({ message: "Internal server error" });
        return;
    }
    next();
};
exports.validateUpdateProduct = validateUpdateProduct;
const validateProductQuery = (req, res, next) => {
    try {
        productForm_schema_1.ProductQuerySchema.parse(req.query);
    }
    catch (error) {
        if (error instanceof zod_1.default.ZodError) {
            console.error("Product Query Validation error:\n", error);
            res.status(400).json({ message: error });
            return;
        }
        res.status(500).json({ message: "Internal server error" });
        return;
    }
    next();
};
exports.validateProductQuery = validateProductQuery;
//# sourceMappingURL=product.middleware.js.map