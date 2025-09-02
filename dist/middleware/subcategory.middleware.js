"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpdateSubCategory = exports.validateCreateSubCategory = void 0;
const categoryForm_schema_1 = require("../libs/schemas/categoryForm.schema");
const zod_1 = __importDefault(require("zod"));
// SubCategory Middleware
const validateCreateSubCategory = (req, res, next) => {
    try {
        categoryForm_schema_1.CreateSubCategorySchema.parse(req.body);
    }
    catch (error) {
        if (error instanceof zod_1.default.ZodError) {
            console.error("Create SubCategory Validation error:\n", error);
            res.status(400).json({ message: error });
            return;
        }
        res.status(500).json({ message: "Internal server error" });
        return;
    }
    next();
};
exports.validateCreateSubCategory = validateCreateSubCategory;
const validateUpdateSubCategory = (req, res, next) => {
    try {
        categoryForm_schema_1.UpdateSubCategorySchema.parse(req.body);
    }
    catch (error) {
        if (error instanceof zod_1.default.ZodError) {
            console.error("Update SubCategory Validation error:\n", error);
            res.status(400).json({ message: error });
            return;
        }
        res.status(500).json({ message: "Internal server error" });
        return;
    }
    next();
};
exports.validateUpdateSubCategory = validateUpdateSubCategory;
//# sourceMappingURL=subcategory.middleware.js.map