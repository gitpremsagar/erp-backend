"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSubCategorySchema = exports.CreateSubCategorySchema = exports.UpdateGroupSchema = exports.CreateGroupSchema = exports.UpdateCategorySchema = exports.CreateCategorySchema = void 0;
const zod_1 = require("zod");
// Category Schema
exports.CreateCategorySchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .min(1, "Category name is required")
        .max(100, "Category name must be at most 100 characters long")
        .trim(),
    description: zod_1.z
        .string()
        .min(1, "Description is required")
        .max(500, "Description must be at most 500 characters long")
        .trim(),
});
exports.UpdateCategorySchema = exports.CreateCategorySchema.partial();
// Group Schema
exports.CreateGroupSchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .min(1, "Group name is required")
        .max(100, "Group name must be at most 100 characters long")
        .trim(),
    description: zod_1.z
        .string()
        .min(1, "Description is required")
        .max(500, "Description must be at most 500 characters long")
        .trim(),
});
exports.UpdateGroupSchema = exports.CreateGroupSchema.partial();
// SubCategory Schema
exports.CreateSubCategorySchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .min(1, "Sub-category name is required")
        .max(100, "Sub-category name must be at most 100 characters long")
        .trim(),
    description: zod_1.z
        .string()
        .min(1, "Description is required")
        .max(500, "Description must be at most 500 characters long")
        .trim(),
    categoryId: zod_1.z
        .string()
        .min(1, "Category ID is required")
        .trim(),
});
exports.UpdateSubCategorySchema = exports.CreateSubCategorySchema.partial();
//# sourceMappingURL=categoryForm.schema.js.map