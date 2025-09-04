"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductStats = exports.deleteProduct = exports.updateProduct = exports.getProductById = exports.getProducts = exports.createProduct = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Create a new product
const createProduct = async (req, res) => {
    try {
        const { name, mrp, productCode, description, expiryDate, validity, stock, stockEntryDate, lowStockLimit, overStockLimit, lowStockAlertColor, lowStockAlertMessage, overStockAlertColor, overStockAlertMessage, inStockAlertColor, inStockAlertMessage, expiryAlertDays, expiryAlertColor, expiryAlertMessage, tags, categoryId, groupId, subCategoryId, grammage, } = req.body;
        // Get user ID from request (assuming it's set by auth middleware)
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ message: "User not authenticated" });
        }
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
        // Create product and stock entry in a transaction
        const result = await prisma.$transaction(async (tx) => {
            const product = await tx.product.create({
                data: {
                    name,
                    mrp,
                    productCode,
                    description,
                    expiryDate: new Date(expiryDate),
                    validity,
                    stock,
                    stockEntryDate: new Date(stockEntryDate),
                    lowStockLimit: lowStockLimit || 20, // TODO: get from stock setting
                    overStockLimit: overStockLimit || 100, // TODO: get from stock setting
                    lowStockAlertColor: lowStockAlertColor || "#008000", // TODO: get from stock setting
                    lowStockAlertMessage: lowStockAlertMessage || "Low Stock", // TODO: get from stock setting
                    overStockAlertColor: overStockAlertColor || "#FF0000", // TODO: get from stock setting
                    overStockAlertMessage: overStockAlertMessage || "Over Stock", // TODO: get from stock setting
                    inStockAlertColor: inStockAlertColor || "#00008B", // TODO: get from stock setting
                    inStockAlertMessage: inStockAlertMessage || "In Stock", // TODO: get from stock setting
                    expiryAlertDays: expiryAlertDays || 5, // TODO: get from stock setting
                    expiryAlertColor: expiryAlertColor || "#FF0000", // TODO: get from stock setting
                    expiryAlertMessage: expiryAlertMessage || "Expired", // TODO: get from stock setting
                    tags: tags || [],
                    imageUrl: "http://example.com/image.jpg",
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
            // Create stock entry record
            const stockEntry = await tx.stockEntry.create({
                data: {
                    productId: product.id,
                    changeInStock: stock,
                    updatedBy: userId,
                },
            });
            return { product, stockEntry };
        });
        res.status(201).json({
            product: result.product,
            stockEntry: result.stockEntry,
        });
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
        const { page = 1, limit = 2, search, categoryId, groupId, subCategoryId, minPrice, maxPrice, } = req.query;
        // Convert string values to numbers
        const pageNum = parseInt(page, 10) || 1;
        const limitNum = parseInt(limit, 10) || 10;
        const skip = (pageNum - 1) * limitNum;
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
                take: limitNum, // Now it's a number
                include: {
                    Category: true,
                    Group: true,
                    SubCategory: true,
                },
                orderBy: { createdAt: "desc" },
            }),
            prisma.product.count({ where }),
        ]);
        const totalPages = Math.ceil(total / limitNum);
        res.json({
            products,
            pagination: {
                page: pageNum, // Use the converted number
                limit: limitNum, // Use the converted number
                total,
                totalPages,
                hasNext: pageNum < totalPages,
                hasPrev: pageNum > 1,
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
        if (updateData.productCode &&
            updateData.productCode !== existingProduct.productCode) {
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