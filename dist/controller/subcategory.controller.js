"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSubCategory = exports.getSubCategoriesByCategory = exports.updateSubCategory = exports.getSubCategoryById = exports.getSubCategories = exports.createSubCategory = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// SubCategory Controllers
const createSubCategory = async (req, res) => {
    try {
        const { name, description, categoryId } = req.body;
        // Check if subcategory name already exists
        const existingSubCategory = await prisma.subCategory.findUnique({
            where: { name },
        });
        if (existingSubCategory) {
            return res.status(409).json({ message: "Sub-category name already exists" });
        }
        // Check if category exists
        const category = await prisma.category.findUnique({
            where: { id: categoryId },
        });
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }
        const subCategory = await prisma.subCategory.create({
            data: {
                name,
                description,
                Category: {
                    connect: { id: categoryId }
                }
            }
        });
        // Fetch the created subcategory with category details
        const subCategoryWithCategory = await prisma.subCategory.findUnique({
            where: { id: subCategory.id },
            include: {
                Category: true
            }
        });
        res.status(201).json({ subCategory: subCategoryWithCategory });
        res.status(201).json({ subCategory });
    }
    catch (error) {
        console.error("Error creating sub-category:\n", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.createSubCategory = createSubCategory;
const getSubCategories = async (req, res) => {
    try {
        const subCategories = await prisma.subCategory.findMany({
            orderBy: { name: "asc" },
            include: {
                Category: true
            }
        });
        res.json({ subCategories });
    }
    catch (error) {
        console.error("Error fetching sub-categories:\n", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.getSubCategories = getSubCategories;
const getSubCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const subCategory = await prisma.subCategory.findUnique({
            where: { id },
            include: {
                Product: true,
                Category: true,
            },
        });
        if (!subCategory) {
            return res.status(404).json({ message: "Sub-category not found" });
        }
        res.json({ subCategory });
    }
    catch (error) {
        console.error("Error fetching sub-category:\n", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.getSubCategoryById = getSubCategoryById;
const updateSubCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, categoryId } = req.body;
        // Check if subcategory exists
        const existingSubCategory = await prisma.subCategory.findUnique({
            where: { id },
        });
        if (!existingSubCategory) {
            return res.status(404).json({ message: "Sub-category not found" });
        }
        // If name is being updated, check for uniqueness
        if (name && name !== existingSubCategory.name) {
            const duplicateSubCategory = await prisma.subCategory.findUnique({
                where: { name },
            });
            if (duplicateSubCategory) {
                return res.status(409).json({ message: "Sub-category name already exists" });
            }
        }
        // If categoryId is being updated, check if category exists
        if (categoryId) {
            const category = await prisma.category.findUnique({
                where: { id: categoryId },
            });
            if (!category) {
                return res.status(404).json({ message: "Category not found" });
            }
        }
        const updateData = {};
        if (name)
            updateData.name = name;
        if (description)
            updateData.description = description;
        if (categoryId) {
            updateData.Category = {
                connect: { id: categoryId }
            };
        }
        const subCategory = await prisma.subCategory.update({
            where: { id },
            data: updateData,
            include: {
                Category: true
            }
        });
        res.json({ subCategory });
    }
    catch (error) {
        console.error("Error updating sub-category:\n", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.updateSubCategory = updateSubCategory;
const getSubCategoriesByCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        // Check if category exists
        const category = await prisma.category.findUnique({
            where: { id: categoryId },
        });
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }
        const subCategories = await prisma.subCategory.findMany({
            where: { categoryId },
            orderBy: { name: "asc" },
            include: {
                Category: true
            }
        });
        res.json({ subCategories });
    }
    catch (error) {
        console.error("Error fetching sub-categories by category:\n", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.getSubCategoriesByCategory = getSubCategoriesByCategory;
const deleteSubCategory = async (req, res) => {
    try {
        const { id } = req.params;
        // Check if subcategory exists
        const existingSubCategory = await prisma.subCategory.findUnique({
            where: { id },
        });
        if (!existingSubCategory) {
            return res.status(404).json({ message: "Sub-category not found" });
        }
        // Check if subcategory is used by any products
        const products = await prisma.product.findMany({
            where: { subCategoryId: id },
        });
        if (products.length > 0) {
            return res.status(400).json({
                message: "Cannot delete sub-category as it is associated with existing products",
            });
        }
        await prisma.subCategory.delete({
            where: { id },
        });
        res.json({ message: "Sub-category deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting sub-category:\n", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.deleteSubCategory = deleteSubCategory;
//# sourceMappingURL=subcategory.controller.js.map