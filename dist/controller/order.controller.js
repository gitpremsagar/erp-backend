"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrder = exports.updateOrder = exports.getOrdersByOriginalOrderId = exports.getOrderByCustomOrderId = exports.getOrderById = exports.getOrderStats = exports.getOrders = exports.createOrder = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Create a new order
const createOrder = async (req, res) => {
    try {
        const { customerId, orderItems, vehicleId } = req.body;
        // Check if customer exists
        const customer = await prisma.user.findUnique({
            where: { id: customerId },
        });
        if (!customer) {
            return res.status(404).json({ message: "Customer not found" });
        }
        // Check if vehicle exists if provided
        if (vehicleId) {
            const vehicle = await prisma.vehicle.findUnique({
                where: { id: vehicleId },
            });
            if (!vehicle) {
                return res.status(404).json({ message: "Vehicle not found" });
            }
        }
        // Check if all products exist
        for (const item of orderItems) {
            const product = await prisma.product.findUnique({
                where: { id: item.productId },
            });
            if (!product) {
                return res
                    .status(404)
                    .json({ message: `Product with ID ${item.productId} not found` });
            }
        }
        // Create order and order items in a transaction
        const order = await prisma.$transaction(async (tx) => {
            // Create the order
            const newOrder = await tx.order.create({
                data: {
                    customerId,
                    vehicleId,
                    status: "MODIFYING",
                },
            });
            // Create order items and update product stock
            for (const item of orderItems) {
                await tx.orderItem.create({
                    data: {
                        orderId: newOrder.id,
                        productId: item.productId,
                        quantity: item.quantity,
                        customerId,
                    },
                });
                //get stockbatches ordered by expiry date
                const stockBatches = await tx.stockBatch.findMany({
                    where: { productId: item.productId, stockQuantity: { gt: 0 }, isArchived: false },
                    orderBy: { expiryDate: "desc" },
                });
                //reduce stock quantity from stockbatches
                for (const stockBatch of stockBatches) {
                    if (stockBatch.stockQuantity >= item.quantity) {
                        await tx.stockBatch.update({
                            where: { id: stockBatch.id },
                            data: { stockQuantity: stockBatch.stockQuantity - item.quantity },
                        });
                        //create stock record
                        await tx.stockRecord.create({
                            data: {
                                productId: item.productId,
                                changeInStock: -item.quantity,
                                createdBy: "system", // TODO: Replace with actual user ID when auth is implemented
                                orderId: newOrder.id,
                                stockBatchId: stockBatch.id,
                                reason: "ASSIGNED_TO_ORDER",
                            },
                        });
                        break;
                    }
                    else {
                        await tx.stockBatch.update({
                            where: { id: stockBatch.id },
                            data: { stockQuantity: 0 },
                        });
                        item.quantity = item.quantity - stockBatch.stockQuantity;
                        //create stock record
                        await tx.stockRecord.create({
                            data: {
                                productId: item.productId,
                                changeInStock: -stockBatch.stockQuantity,
                                createdBy: "system", // TODO: Replace with actual user ID when auth is implemented
                                orderId: newOrder.id,
                                stockBatchId: stockBatch.id,
                                reason: "ASSIGNED_TO_ORDER",
                            },
                        });
                    }
                }
            }
            return newOrder;
        });
        // Get the complete order with items
        const completeOrder = await prisma.order.findUnique({
            where: { id: order.id },
            include: {
                customer: true,
                vehicle: true,
                StockRecord: true,
                OrderItem: {
                    include: {
                        Product: true,
                        Customer: true,
                    },
                },
            },
        });
        res.status(201).json({ order: completeOrder });
    }
    catch (error) {
        console.error("Error creating order:\n", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.createOrder = createOrder;
// Get all orders with pagination and filtering
const getOrders = async (req, res) => {
    try {
        const { page = 1, limit = 10, status, customerId, startDate, endDate, } = req.query;
        const skip = (Number(page) - 1) * Number(limit);
        // Build where clause
        const where = {};
        if (status) {
            where.status = status;
        }
        if (customerId) {
            where.customerId = customerId;
        }
        if (startDate || endDate) {
            where.orderDate = {};
            if (startDate) {
                where.orderDate.gte = new Date(startDate);
            }
            if (endDate) {
                where.orderDate.lte = new Date(endDate);
            }
        }
        const [orders, total] = await Promise.all([
            prisma.order.findMany({
                where,
                skip,
                take: Number(limit),
                include: {
                    customer: true,
                    vehicle: true,
                    deliveryAddress: true,
                    StockRecord: true,
                    OrderItem: {
                        include: {
                            Product: true,
                            Customer: true,
                        },
                    },
                },
                orderBy: {
                    orderDate: "desc",
                },
            }),
            prisma.order.count({ where }),
        ]);
        const totalPages = Math.ceil(total / Number(limit));
        res.json({
            orders,
            pagination: {
                currentPage: Number(page),
                totalPages,
                totalItems: total,
                itemsPerPage: Number(limit),
            },
        });
    }
    catch (error) {
        console.error("Error fetching orders:\n", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.getOrders = getOrders;
// Get order statistics
const getOrderStats = async (req, res) => {
    try {
        const [totalOrders, pendingOrders, completedOrders, totalRevenue] = await Promise.all([
            prisma.order.count(),
            prisma.order.count({ where: { status: "PENDING" } }),
            prisma.order.count({ where: { status: "COMPLETED" } }),
            prisma.order.aggregate({
                _sum: {
                    totalPrice: true,
                },
            }),
        ]);
        res.json({
            totalOrders,
            pendingOrders,
            completedOrders,
            totalRevenue: totalRevenue._sum.totalPrice || 0,
        });
    }
    catch (error) {
        console.error("Error fetching order statistics:\n", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.getOrderStats = getOrderStats;
// Get a single order by ID
const getOrderById = async (req, res) => {
    try {
        const { orderId } = req.params;
        const order = await prisma.order.findUnique({
            where: { id: orderId },
            include: {
                customer: true,
                vehicle: true,
                deliveryAddress: true,
                StockRecord: true,
                OrderItem: {
                    include: {
                        Product: true,
                        Customer: true,
                    },
                },
            },
        });
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.json({ order });
    }
    catch (error) {
        console.error("Error fetching order:\n", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.getOrderById = getOrderById;
// Get a single order by custom order ID
const getOrderByCustomOrderId = async (req, res) => {
    try {
        const { customOrderId } = req.params;
        const order = await prisma.order.findUnique({
            where: { customeOrderId: customOrderId },
            include: {
                customer: true,
                vehicle: true,
                deliveryAddress: true,
                StockRecord: true,
                OrderItem: {
                    include: {
                        Product: true,
                        Customer: true,
                    },
                },
            },
        });
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.json({ order });
    }
    catch (error) {
        console.error("Error fetching order by custom order ID:\n", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.getOrderByCustomOrderId = getOrderByCustomOrderId;
// Get orders by original order ID (for tracking order modifications)
const getOrdersByOriginalOrderId = async (req, res) => {
    try {
        const { originalOrderId } = req.params;
        const { page = 1, limit = 10 } = req.query;
        const skip = (Number(page) - 1) * Number(limit);
        const [orders, total] = await Promise.all([
            prisma.order.findMany({
                where: { originalOrderId },
                skip,
                take: Number(limit),
                include: {
                    customer: true,
                    vehicle: true,
                    deliveryAddress: true,
                    StockRecord: true,
                    OrderItem: {
                        include: {
                            Product: true,
                            Customer: true,
                        },
                    },
                },
                orderBy: {
                    orderDate: "desc",
                },
            }),
            prisma.order.count({ where: { originalOrderId } }),
        ]);
        const totalPages = Math.ceil(total / Number(limit));
        res.json({
            orders,
            pagination: {
                currentPage: Number(page),
                totalPages,
                totalItems: total,
                itemsPerPage: Number(limit),
            },
        });
    }
    catch (error) {
        console.error("Error fetching orders by original order ID:\n", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.getOrdersByOriginalOrderId = getOrdersByOriginalOrderId;
// Update an order
const updateOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status, customerId, vehicleId, originalOrderId, stockRecordId, orderItems, // Add support for updating order items
         } = req.body;
        // Check if order exists
        const existingOrder = await prisma.order.findUnique({
            where: { id: orderId },
            include: {
                OrderItem: true,
            },
        });
        if (!existingOrder) {
            return res.status(404).json({ message: "Order not found" });
        }
        // Validate all related entities before processing
        if (customerId) {
            const customer = await prisma.user.findUnique({
                where: { id: customerId },
            });
            if (!customer) {
                return res.status(404).json({ message: "Customer not found" });
            }
        }
        if (vehicleId) {
            const vehicle = await prisma.vehicle.findUnique({
                where: { id: vehicleId },
            });
            if (!vehicle) {
                return res.status(404).json({ message: "Vehicle not found" });
            }
        }
        if (originalOrderId) {
            const originalOrder = await prisma.order.findUnique({
                where: { id: originalOrderId },
            });
            if (!originalOrder) {
                return res.status(404).json({ message: "Original order not found" });
            }
        }
        if (stockRecordId) {
            const stockRecord = await prisma.stockRecord.findUnique({
                where: { id: stockRecordId },
            });
            if (!stockRecord) {
                return res.status(404).json({ message: "Stock record not found" });
            }
        }
        // Validate order items if provided
        if (orderItems && orderItems.length > 0) {
            for (const item of orderItems) {
                const product = await prisma.product.findUnique({
                    where: { id: item.productId },
                });
                if (!product) {
                    return res.status(404).json({
                        message: `Product with ID ${item.productId} not found`
                    });
                }
            }
        }
        // Update order and related data in a transaction
        const result = await prisma.$transaction(async (tx) => {
            // Update the order
            const updatedOrder = await tx.order.update({
                where: { id: orderId },
                data: {
                    status,
                    customerId,
                    vehicleId,
                    originalOrderId,
                    stockRecordId,
                },
            });
            // Handle order items updates if provided
            let updatedOrderItems = [];
            if (orderItems && orderItems.length > 0) {
                // Delete existing order items
                await tx.orderItem.deleteMany({
                    where: { orderId: orderId },
                });
                // Create new order items and manage stock
                for (const item of orderItems) {
                    const orderItem = await tx.orderItem.create({
                        data: {
                            orderId: orderId,
                            productId: item.productId,
                            quantity: item.quantity,
                            customerId: customerId || existingOrder.customerId,
                        },
                    });
                    updatedOrderItems.push(orderItem);
                    // Handle stock management for order items
                    if (status === "MODIFYING" || status === "PENDING") {
                        // Get stock batches ordered by expiry date (newest first)
                        const stockBatches = await tx.stockBatch.findMany({
                            where: {
                                productId: item.productId,
                                stockQuantity: { gt: 0 },
                                isArchived: false
                            },
                            orderBy: { expiryDate: "desc" },
                        });
                        // Reduce stock quantity from stock batches
                        let remainingQuantity = item.quantity;
                        for (const stockBatch of stockBatches) {
                            if (remainingQuantity <= 0)
                                break;
                            if (stockBatch.stockQuantity >= remainingQuantity) {
                                await tx.stockBatch.update({
                                    where: { id: stockBatch.id },
                                    data: { stockQuantity: stockBatch.stockQuantity - remainingQuantity },
                                });
                                // Create stock record
                                await tx.stockRecord.create({
                                    data: {
                                        productId: item.productId,
                                        changeInStock: -remainingQuantity,
                                        createdBy: "system", // TODO: Replace with actual user ID when auth is implemented
                                        orderId: orderId,
                                        stockBatchId: stockBatch.id,
                                        reason: "ASSIGNED_TO_ORDER",
                                    },
                                });
                                remainingQuantity = 0;
                            }
                            else {
                                await tx.stockBatch.update({
                                    where: { id: stockBatch.id },
                                    data: { stockQuantity: 0 },
                                });
                                // Create stock record
                                await tx.stockRecord.create({
                                    data: {
                                        productId: item.productId,
                                        changeInStock: -stockBatch.stockQuantity,
                                        createdBy: "system", // TODO: Replace with actual user ID when auth is implemented
                                        orderId: orderId,
                                        stockBatchId: stockBatch.id,
                                        reason: "ASSIGNED_TO_ORDER",
                                    },
                                });
                                remainingQuantity -= stockBatch.stockQuantity;
                            }
                        }
                    }
                }
            }
            return { updatedOrder, updatedOrderItems };
        });
        // Get the complete updated order with all relations
        const completeOrder = await prisma.order.findUnique({
            where: { id: orderId },
            include: {
                customer: true,
                vehicle: true,
                deliveryAddress: true,
                StockRecord: true,
                OrderItem: {
                    include: {
                        Product: true,
                        Customer: true,
                    },
                },
            },
        });
        res.json({
            order: completeOrder,
            updatedOrderItems: result.updatedOrderItems,
        });
    }
    catch (error) {
        console.error("Error updating order:\n", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.updateOrder = updateOrder;
// Delete an order
const deleteOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
        // Check if order exists
        const order = await prisma.order.findUnique({
            where: { id: orderId },
            include: {
                OrderItem: true,
            },
        });
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        // Note: Stock restoration should be handled through the stock management system
        // using StockRecord with appropriate reason (e.g., CORRECTION_BY_ADMIN)
        // Delete order items and order
        await prisma.$transaction(async (tx) => {
            await tx.orderItem.deleteMany({
                where: { orderId: orderId },
            });
            await tx.order.delete({
                where: { id: orderId },
            });
        });
        res.json({ message: "Order deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting order:\n", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.deleteOrder = deleteOrder;
//# sourceMappingURL=order.controller.js.map