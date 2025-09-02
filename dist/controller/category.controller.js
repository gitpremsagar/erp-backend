"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.updateCategory = exports.getCategoryById = exports.getCategories = exports.createCategory = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Category Controllers
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description } = req.body;
        // Check if category name already exists
        const existingCategory = yield prisma.category.findUnique({
            where: { name },
        });
        if (existingCategory) {
            return res.status(409).json({ message: "Category name already exists" });
        }
        const category = yield prisma.category.create({
            data: { name, description },
        });
        res.status(201).json({ category });
    }
    catch (error) {
        console.error("Error creating category:\n", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.createCategory = createCategory;
const getCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield prisma.category.findMany({
            orderBy: { name: "asc" },
        });
        res.json({ categories });
    }
    catch (error) {
        console.error("Error fetching categories:\n", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getCategories = getCategories;
const getCategoryById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const category = yield prisma.category.findUnique({
            where: { id },
            include: {
                Product: true,
            },
        });
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.json({ category });
    }
    catch (error) {
        console.error("Error fetching category:\n", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getCategoryById = getCategoryById;
const updateCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, description } = req.body;
        // Check if category exists
        const existingCategory = yield prisma.category.findUnique({
            where: { id },
        });
        if (!existingCategory) {
            return res.status(404).json({ message: "Category not found" });
        }
        // If name is being updated, check for uniqueness
        if (name && name !== existingCategory.name) {
            const duplicateCategory = yield prisma.category.findUnique({
                where: { name },
            });
            if (duplicateCategory) {
                return res.status(409).json({ message: "Category name already exists" });
            }
        }
        const category = yield prisma.category.update({
            where: { id },
            data: { name, description },
        });
        res.json({ category });
    }
    catch (error) {
        console.error("Error updating category:\n", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.updateCategory = updateCategory;
const deleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        // Check if category exists
        const existingCategory = yield prisma.category.findUnique({
            where: { id },
        });
        if (!existingCategory) {
            return res.status(404).json({ message: "Category not found" });
        }
        // Check if category is used by any products
        const products = yield prisma.product.findMany({
            where: { categoryId: id },
        });
        if (products.length > 0) {
            return res.status(400).json({
                message: "Cannot delete category as it is associated with existing products",
            });
        }
        yield prisma.category.delete({
            where: { id },
        });
        res.json({ message: "Category deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting category:\n", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.deleteCategory = deleteCategory;
//# sourceMappingURL=category.controller.js.map