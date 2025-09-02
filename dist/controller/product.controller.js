"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductStats = exports.deleteProduct = exports.updateProduct = exports.getProductById = exports.getProducts = exports.createProduct = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Create a new product
const createProduct = async (req, res) => {
    try {
        const { name, mrp, productCode, description, expiryDate, validity, stock, stockEntryDate, lowStockLimit, overStockLimit, lowStockAlertColor, lowStockAlertMessage, overStockAlertColor, overStockAlertMessage, inStockAlertColor, inStockAlertMessage, expiryAlertDays, expiryAlertColor, expiryAlertMessage, tags, imageUrl, categoryId, groupId, subCategoryId, grammage, } = req.body;
        // Check if product code already exists
        const existingProduct = await prisma.product.findUnique({
            where: { productCode },
        });
        if (existingProduct) {
            return res.status(409).json({ message: "Product code already exists" });
        }
        // Verify that category, group, and subcategory exist
        const [category, group, subCategory] = await Promise.all([
            prisma.category.findUnique({ where: { id: categoryId } }),
            prisma.group.findUnique({ where: { id: groupId } }),
            prisma.subCategory.findUnique({ where: { id: subCategoryId } }),
        ]);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }
        if (!group) {
            return res.status(404).json({ message: "Group not found" });
        }
        if (!subCategory) {
            return res.status(404).json({ message: "Sub-category not found" });
        }
        const product = await prisma.product.create({
            data: {
                name,
                mrp,
                productCode,
                description,
                expiryDate: new Date(expiryDate),
                validity,
                stock,
                stockEntryDate: new Date(stockEntryDate),
                lowStockLimit: lowStockLimit || 0,
                overStockLimit: overStockLimit || 0,
                lowStockAlertColor: lowStockAlertColor || "#008000",
                lowStockAlertMessage: lowStockAlertMessage || "Low Stock",
                overStockAlertColor: overStockAlertColor || "#FF0000",
                overStockAlertMessage: overStockAlertMessage || "Over Stock",
                inStockAlertColor: inStockAlertColor || "#00008B",
                inStockAlertMessage: inStockAlertMessage || "In Stock",
                expiryAlertDays: expiryAlertDays || 0,
                expiryAlertColor: expiryAlertColor || "#FF0000",
                expiryAlertMessage: expiryAlertMessage || "Expired",
                tags: tags || [],
                imageUrl,
                categoryId,
                groupId,
                subCategoryId,
                grammage,
            },
            include: {
                Category: true,
                Group: true,
                SubCategory: true,
            },
        });
        res.status(201).json({ product });
    }
    catch (error) {
        console.error("Error creating product:\n", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.createProduct = createProduct;
// Get all products with pagination and filtering
const getProducts = async (req, res) => {
    try {
        const { page = 1, limit = 10, search, categoryId, groupId, subCategoryId, minPrice, maxPrice, } = req.query;
        const skip = (page - 1) * limit;
        // Build where clause
        const where = {};
        if (search) {
            where.OR = [
                { name: { contains: search, mode: "insensitive" } },
                { productCode: { contains: search, mode: "insensitive" } },
                { description: { contains: search, mode: "insensitive" } },
            ];
        }
        if (categoryId) {
            where.categoryId = categoryId;
        }
        if (groupId) {
            where.groupId = groupId;
        }
        if (subCategoryId) {
            where.subCategoryId = subCategoryId;
        }
        if (minPrice !== undefined || maxPrice !== undefined) {
            where.mrp = {};
            if (minPrice !== undefined)
                where.mrp.gte = minPrice;
            if (maxPrice !== undefined)
                where.mrp.lte = maxPrice;
        }
        const [products, total] = await Promise.all([
            prisma.product.findMany({
                where,
                skip,
                take: limit,
                include: {
                    Category: true,
                    Group: true,
                    SubCategory: true,
                },
                orderBy: { createdAt: "desc" },
            }),
            prisma.product.count({ where }),
        ]);
        const totalPages = Math.ceil(total / limit);
        res.json({
            products,
            pagination: {
                page,
                limit,
                total,
                totalPages,
                hasNext: page < totalPages,
                hasPrev: page > 1,
            },
        });
    }
    catch (error) {
        console.error("Error fetching products:\n", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.getProducts = getProducts;
// Get a single product by ID
const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await prisma.product.findUnique({
            where: { id },
            include: {
                Category: true,
                Group: true,
                SubCategory: true,
            },
        });
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json({ product });
    }
    catch (error) {
        console.error("Error fetching product:\n", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.getProductById = getProductById;
// Update a product
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        // Check if product exists
        const existingProduct = await prisma.product.findUnique({
            where: { id },
        });
        if (!existingProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        // If product code is being updated, check for uniqueness
        if (updateData.productCode && updateData.productCode !== existingProduct.productCode) {
            const duplicateProduct = await prisma.product.findUnique({
                where: { productCode: updateData.productCode },
            });
            if (duplicateProduct) {
                return res.status(409).json({ message: "Product code already exists" });
            }
        }
        // Verify that category, group, and subcategory exist if they're being updated
        if (updateData.categoryId) {
            const category = await prisma.category.findUnique({
                where: { id: updateData.categoryId },
            });
            if (!category) {
                return res.status(404).json({ message: "Category not found" });
            }
        }
        if (updateData.groupId) {
            const group = await prisma.group.findUnique({
                where: { id: updateData.groupId },
            });
            if (!group) {
                return res.status(404).json({ message: "Group not found" });
            }
        }
        if (updateData.subCategoryId) {
            const subCategory = await prisma.subCategory.findUnique({
                where: { id: updateData.subCategoryId },
            });
            if (!subCategory) {
                return res.status(404).json({ message: "Sub-category not found" });
            }
        }
        // Convert date strings to Date objects if provided
        if (updateData.expiryDate) {
            updateData.expiryDate = new Date(updateData.expiryDate);
        }
        if (updateData.stockEntryDate) {
            updateData.stockEntryDate = new Date(updateData.stockEntryDate);
        }
        const product = await prisma.product.update({
            where: { id },
            data: updateData,
            include: {
                Category: true,
                Group: true,
                SubCategory: true,
            },
        });
        res.json({ product });
    }
    catch (error) {
        console.error("Error updating product:\n", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.updateProduct = updateProduct;
// Delete a product
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        // Check if product exists
        const existingProduct = await prisma.product.findUnique({
            where: { id },
        });
        if (!existingProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        // Check if product is used in any orders
        const orderItems = await prisma.orderItem.findMany({
            where: { productId: id },
        });
        if (orderItems.length > 0) {
            return res.status(400).json({
                message: "Cannot delete product as it is associated with existing orders",
            });
        }
        await prisma.product.delete({
            where: { id },
        });
        res.json({ message: "Product deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting product:\n", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.deleteProduct = deleteProduct;
// Get product statistics
const getProductStats = async (req, res) => {
    try {
        const [totalProducts, lowStockProducts, totalValue] = await Promise.all([
            prisma.product.count(),
            prisma.product.count({
                where: { stock: { lte: 10 } },
            }),
            prisma.product.aggregate({
                _sum: {
                    mrp: true,
                },
            }),
        ]);
        const averagePrice = totalProducts > 0 ? totalValue._sum.mrp / totalProducts : 0;
        res.json({
            stats: {
                totalProducts,
                lowStockProducts,
                totalValue: totalValue._sum.mrp || 0,
                averagePrice: Math.round(averagePrice),
            },
        });
    }
    catch (error) {
        console.error("Error fetching product stats:\n", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.getProductStats = getProductStats;
//# sourceMappingURL=product.controller.js.map