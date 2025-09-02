"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpdateCategory = exports.validateCreateCategory = void 0;
const categoryForm_schema_1 = require("../libs/schemas/categoryForm.schema");
const zod_1 = __importDefault(require("zod"));
// Category Middleware
const validateCreateCategory = (req, res, next) => {
    try {
        categoryForm_schema_1.CreateCategorySchema.parse(req.body);
    }
    catch (error) {
        if (error instanceof zod_1.default.ZodError) {
            console.error("Create Category Validation error:\n", error);
            res.status(400).json({ message: error });
            return;
        }
        res.status(500).json({ message: "Internal server error" });
        return;
    }
    next();
};
exports.validateCreateCategory = validateCreateCategory;
const validateUpdateCategory = (req, res, next) => {
    try {
        categoryForm_schema_1.UpdateCategorySchema.parse(req.body);
    }
    catch (error) {
        if (error instanceof zod_1.default.ZodError) {
            console.error("Update Category Validation error:\n", error);
            res.status(400).json({ message: error });
            return;
        }
        res.status(500).json({ message: "Internal server error" });
        return;
    }
    next();
};
exports.validateUpdateCategory = validateUpdateCategory;
//# sourceMappingURL=category.middleware.js.map