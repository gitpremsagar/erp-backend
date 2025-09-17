"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSupplierStats = exports.deleteSupplier = exports.updateSupplier = exports.getSupplierById = exports.getSuppliers = exports.createSupplier = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Create a new supplier
const createSupplier = async (req, res) => {
    try {
        const { name } = req.body;
        // Check if supplier with same name already exists
        const existingSupplier = await prisma.supplier.findFirst({
            where: { name: { equals: name, mode: "insensitive" } },
        });
        if (existingSupplier) {
            return res.status(400).json({ message: "Supplier with this name already exists" });
        }
        const supplier = await prisma.supplier.create({
            data: {
                name,
            },
        });
        res.status(201).json({ supplier });
    }
    catch (error) {
        console.error("Error creating supplier:\n", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.createSupplier = createSupplier;
// Get all suppliers with pagination and filtering
const getSuppliers = async (req, res) => {
    try {
        const { page = 1, limit = 10, search, } = req.query;
        // Convert string values to numbers
        const pageNum = parseInt(page, 10) || 1;
        const limitNum = parseInt(limit, 10) || 10;
        const skip = (pageNum - 1) * limitNum;
        // Build where clause
        const where = {};
        if (search) {
            where.name = { contains: search, mode: "insensitive" };
        }
        const [suppliers, total] = await Promise.all([
            prisma.supplier.findMany({
                where,
                skip,
                take: limitNum,
                include: {
                    StockBatch: {
                        select: {
                            id: true,
                            stockQuantity: true,
                            product: {
                                select: {
                                    name: true,
                                    productCode: true,
                                },
                            },
                        },
                    },
                },
                orderBy: { createdAt: "desc" },
            }),
            prisma.supplier.count({ where }),
        ]);
        const totalPages = Math.ceil(total / limitNum);
        res.json({
            suppliers,
            pagination: {
                page: pageNum,
                limit: limitNum,
                total,
                totalPages,
                hasNext: pageNum < totalPages,
                hasPrev: pageNum > 1,
            },
        });
    }
    catch (error) {
        console.error("Error fetching suppliers:\n", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.getSuppliers = getSuppliers;
// Get a single supplier by ID
const getSupplierById = async (req, res) => {
    try {
        const { id } = req.params;
        const supplier = await prisma.supplier.findUnique({
            where: { id },
            include: {
                StockBatch: {
                    include: {
                        product: {
                            include: {
                                Category: {
                                    select: {
                                        id: true,
                                        name: true,
                                    },
                                },
                            },
                        },
                    },
                    orderBy: { createdAt: "desc" },
                },
            },
        });
        if (!supplier) {
            return res.status(404).json({ message: "Supplier not found" });
        }
        res.json({ supplier });
    }
    catch (error) {
        console.error("Error fetching supplier:\n", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.getSupplierById = getSupplierById;
// Update a supplier
const updateSupplier = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        // Check if supplier exists
        const existingSupplier = await prisma.supplier.findUnique({
            where: { id },
        });
        if (!existingSupplier) {
            return res.status(404).json({ message: "Supplier not found" });
        }
        // Check if another supplier with same name already exists
        if (name && name !== existingSupplier.name) {
            const duplicateSupplier = await prisma.supplier.findFirst({
                where: {
                    name: { equals: name, mode: "insensitive" },
                    id: { not: id }
                },
            });
            if (duplicateSupplier) {
                return res.status(400).json({ message: "Supplier with this name already exists" });
            }
        }
        const supplier = await prisma.supplier.update({
            where: { id },
            data: { name },
            include: {
                StockBatch: {
                    select: {
                        id: true,
                        stockQuantity: true,
                        product: {
                            select: {
                                name: true,
                                productCode: true,
                            },
                        },
                    },
                },
            },
        });
        res.json({ supplier });
    }
    catch (error) {
        console.error("Error updating supplier:\n", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.updateSupplier = updateSupplier;
// Delete a supplier
const deleteSupplier = async (req, res) => {
    try {
        const { id } = req.params;
        // Check if supplier exists
        const existingSupplier = await prisma.supplier.findUnique({
            where: { id },
        });
        if (!existingSupplier) {
            return res.status(404).json({ message: "Supplier not found" });
        }
        // Check if supplier is used in any stock records
        const stockRecords = await prisma.stockBatch.findMany({
            where: { supplierId: existingSupplier.id },
        });
        if (stockRecords.length > 0) {
            return res.status(400).json({
                message: "Cannot delete supplier as it has associated stock records",
            });
        }
        // Delete the supplier
        await prisma.supplier.delete({
            where: { id },
        });
        res.json({ message: "Supplier deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting supplier:\n", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.deleteSupplier = deleteSupplier;
// Get supplier statistics
const getSupplierStats = async (req, res) => {
    try {
        const [totalSuppliers, suppliersWithStock, totalStockValue,] = await Promise.all([
            prisma.supplier.count(),
            prisma.supplier.count({
                where: {
                    StockBatch: {
                        some: {
                            stockQuantity: { gt: 0 },
                        },
                    },
                },
            }),
            prisma.stockBatch.aggregate({
                where: {
                    supplierId: { not: null },
                },
                _sum: {
                    stockQuantity: true,
                },
            }),
        ]);
        // Calculate total inventory value by supplier
        const suppliersWithProducts = await prisma.supplier.findMany({
            include: {
                StockBatch: {
                    include: {
                        product: {
                            select: {
                                mrp: true,
                            },
                        },
                    },
                },
            },
        });
        const totalInventoryValue = suppliersWithProducts.reduce((sum, supplier) => {
            const supplierValue = supplier.StockBatch.reduce((stockSum, stock) => stockSum + (stock.product.mrp * stock.stockQuantity), 0);
            return sum + supplierValue;
        }, 0);
        res.json({
            stats: {
                totalSuppliers,
                suppliersWithStock,
                totalStockQuantity: totalStockValue._sum.stockQuantity || 0,
                totalInventoryValue,
                averageStockPerSupplier: totalSuppliers > 0 ? (totalStockValue._sum.stockQuantity || 0) / totalSuppliers : 0,
            },
        });
    }
    catch (error) {
        console.error("Error fetching supplier stats:\n", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.getSupplierStats = getSupplierStats;
//# sourceMappingURL=supplier.controller.js.map