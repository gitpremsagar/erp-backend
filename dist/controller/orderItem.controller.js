"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrderItemStats = exports.deleteOrderItem = exports.updateOrderItem = exports.getCustomerProductOrderHistory = exports.getProducOrderHistory = exports.getOrderItems = exports.createOrderItem = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Create a new order item
const createOrderItem = async (req, res) => {
    try {
        const { orderId, productId, quantity, customerId, orderCompleted = false, } = req.body;
        // Check if order exists
        const order = await prisma.order.findUnique({
            where: { id: orderId },
        });
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        // Check if customer exists
        if (customerId) {
            const customer = await prisma.user.findUnique({
                where: { id: customerId },
            });
            if (!customer) {
                return res.status(404).json({ message: "Customer not found" });
            }
        }
        // Check if product exists
        const product = await prisma.product.findUnique({
            where: { id: productId },
        });
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        // Check if product has sufficient stock
        if (product.stock < quantity) {
            return res.status(400).json({
                message: `Insufficient stock. Available: ${product.stock}, Requested: ${quantity}`
            });
        }
        // Create order item
        const orderItem = await prisma.orderItem.create({
            data: {
                orderId,
                productId,
                quantity,
                customerId,
                orderCompleted,
            },
            include: {
                Order: true,
                Product: {
                    include: {
                        Category: true,
                        SubCategory: true,
                    },
                },
                Customer: true,
            },
        });
        // Update product stock
        await prisma.product.update({
            where: { id: productId },
            data: {
                stock: product.stock - quantity,
            },
        });
        // Create stock entry record
        await prisma.stockEntry.create({
            data: {
                productId,
                changeInStock: -quantity,
                // TODO: fix it
                // updatedBy: req.user?.id || "system", // Assuming user info is available in req.user
                updatedBy: "system",
            },
        });
        res.status(201).json({ orderItem });
    }
    catch (error) {
        console.error("Error creating order item:\n", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.createOrderItem = createOrderItem;
// Get all order items with pagination and filtering
const getOrderItems = async (req, res) => {
    try {
        const { page = "1", limit = "10", orderId, productId, orderCompleted, } = req.query;
        // Convert string parameters to numbers
        const pageNum = parseInt(page, 10);
        const limitNum = parseInt(limit, 10);
        // Validate parameters
        if (isNaN(pageNum) || isNaN(limitNum) || pageNum < 1 || limitNum < 1) {
            return res.status(400).json({
                message: "Invalid pagination parameters. Page and limit must be positive numbers."
            });
        }
        const skip = (pageNum - 1) * limitNum;
        // Build where clause
        const where = {};
        if (orderId) {
            where.orderId = orderId;
        }
        if (productId) {
            where.productId = productId;
        }
        if (orderCompleted !== undefined) {
            where.orderCompleted = orderCompleted;
        }
        const [orderItems, total] = await Promise.all([
            prisma.orderItem.findMany({
                where,
                skip,
                take: limitNum,
                include: {
                    Order: true,
                    Product: {
                        include: {
                            Category: true,
                            SubCategory: true,
                        },
                    },
                    Customer: true,
                },
                orderBy: { createdAt: "desc" },
            }),
            prisma.orderItem.count({ where }),
        ]);
        const totalPages = Math.ceil(total / limitNum);
        res.json({
            orderItems,
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
        console.error("Error fetching order items:\n", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.getOrderItems = getOrderItems;
// Get a single order item by ID
const getProducOrderHistory = async (req, res) => {
    try {
        const { productId } = req.params;
        const productOrderHistory = await prisma.orderItem.findMany({
            where: { productId },
            include: {
                Order: true,
                Product: {
                    include: {
                        Category: true,
                        SubCategory: true,
                    },
                },
                Customer: true,
            },
        });
        if (!productOrderHistory) {
            return res.status(404).json({ message: "Product order history not found" });
        }
        res.json({ productOrderHistory });
    }
    catch (error) {
        console.error("Error fetching produc order history:\n", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.getProducOrderHistory = getProducOrderHistory;
// Get a history of product order by customer id and product id
const getCustomerProductOrderHistory = async (req, res) => {
    try {
        const { customerId, productId } = req.params;
        const customerProductOrderHistory = await prisma.orderItem.findMany({
            where: { customerId, productId },
            include: {
                Order: true,
                Product: true,
            },
        });
    }
    catch (error) {
        console.error("Error fetching customer product order history:\n", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.getCustomerProductOrderHistory = getCustomerProductOrderHistory;
// Update an order item
const updateOrderItem = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        // Check if order item exists
        const existingOrderItem = await prisma.orderItem.findUnique({
            where: { id },
            include: {
                Product: true,
            },
        });
        if (!existingOrderItem) {
            return res.status(404).json({ message: "Order item not found" });
        }
        // If quantity is being updated, handle stock changes
        if (updateData.quantity !== undefined) {
            const quantityDifference = updateData.quantity - existingOrderItem.quantity;
            if (quantityDifference > 0) {
                // Check if product has sufficient stock for increase
                if (existingOrderItem.Product.stock < quantityDifference) {
                    return res.status(400).json({
                        message: `Insufficient stock. Available: ${existingOrderItem.Product.stock}, Additional needed: ${quantityDifference}`
                    });
                }
            }
            // Update product stock
            await prisma.product.update({
                where: { id: existingOrderItem.productId },
                data: {
                    stock: existingOrderItem.Product.stock - quantityDifference,
                },
            });
            // Create stock entry record
            await prisma.stockEntry.create({
                data: {
                    productId: existingOrderItem.productId,
                    changeInStock: -quantityDifference,
                    // TODO: fix it
                    // updatedBy: req.user?.id || "system",
                    updatedBy: "system",
                },
            });
        }
        // Convert date string to Date object if provided
        if (updateData.deliveryDate) {
            updateData.deliveryDate = new Date(updateData.deliveryDate);
        }
        const orderItem = await prisma.orderItem.update({
            where: { id },
            data: updateData,
            include: {
                Order: true,
                Product: {
                    include: {
                        Category: true,
                        SubCategory: true,
                    },
                },
                Customer: true,
            },
        });
        res.json({ orderItem });
    }
    catch (error) {
        console.error("Error updating order item:\n", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.updateOrderItem = updateOrderItem;
// Delete an order item
const deleteOrderItem = async (req, res) => {
    try {
        const { id } = req.params;
        // Check if order item exists
        const existingOrderItem = await prisma.orderItem.findUnique({
            where: { id },
            include: {
                Product: true,
            },
        });
        if (!existingOrderItem) {
            return res.status(404).json({ message: "Order item not found" });
        }
        // Restore product stock
        await prisma.product.update({
            where: { id: existingOrderItem.productId },
            data: {
                stock: existingOrderItem.Product.stock + existingOrderItem.quantity,
            },
        });
        // Create stock entry record
        await prisma.stockEntry.create({
            data: {
                productId: existingOrderItem.productId,
                changeInStock: existingOrderItem.quantity,
                // TODO: fix it
                // updatedBy: req.user?.id || "system",
                updatedBy: "system",
            },
        });
        // Delete the order item
        await prisma.orderItem.delete({
            where: { id },
        });
        res.json({ message: "Order item deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting order item:\n", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.deleteOrderItem = deleteOrderItem;
// Get order item statistics
const getOrderItemStats = async (req, res) => {
    try {
        const [totalOrderItems, completedOrderItems, pendingOrderItems] = await Promise.all([
            prisma.orderItem.count(),
            prisma.orderItem.count({
                where: { orderCompleted: true },
            }),
            prisma.orderItem.count({
                where: { orderCompleted: false },
            }),
        ]);
        const completionRate = totalOrderItems > 0 ? (completedOrderItems / totalOrderItems) * 100 : 0;
        res.json({
            stats: {
                totalOrderItems,
                completedOrderItems,
                pendingOrderItems,
                completionRate: Math.round(completionRate * 100) / 100,
            },
        });
    }
    catch (error) {
        console.error("Error fetching order item stats:\n", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.getOrderItemStats = getOrderItemStats;
//# sourceMappingURL=orderItem.controller.js.map