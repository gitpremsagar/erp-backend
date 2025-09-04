"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrder = exports.updateOrder = exports.getOrderById = exports.getOrderStats = exports.getOrders = exports.createOrder = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Create a new order
const createOrder = async (req, res) => {
    try {
        const { customerId, orderItems, vehicleId, deliveryAddressId, totalPrice } = req.body;
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
        // Check if delivery address exists if provided
        if (deliveryAddressId) {
            const deliveryAddress = await prisma.deliveryAddress.findUnique({
                where: { id: deliveryAddressId },
            });
            if (!deliveryAddress) {
                return res.status(404).json({ message: "Delivery address not found" });
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
            // order will get modified manually
            // if (product.stock < item.quantity) {
            //   return res.status(400).json({
            //     message: `Insufficient stock for product ${product.name}. Available: ${product.stock}, Requested: ${item.quantity}`
            //   });
            // }
        }
        // Create order and order items in a transaction
        const order = await prisma.$transaction(async (tx) => {
            // Create the order
            const newOrder = await tx.order.create({
                data: {
                    customerId,
                    vehicleId,
                    deliveryAddressId,
                    totalPrice: totalPrice || 0,
                },
                include: {
                    customer: true,
                    vehicle: true,
                    deliveryAddress: true,
                },
            });
            // Create order items and update product stock
            for (const item of orderItems) {
                await tx.orderItem.create({
                    data: {
                        orderId: newOrder.id,
                        productId: item.productId,
                        quantity: item.quantity,
                        customerId, // Add customerId to OrderItem
                        deliveryDate: new Date(),
                    },
                });
                // Update product stock
                await tx.product.update({
                    where: { id: item.productId },
                    data: {
                        stock: {
                            decrement: item.quantity,
                        },
                    },
                });
            }
            return newOrder;
        });
        // Get the complete order with items
        const completeOrder = await prisma.order.findUnique({
            where: { id: order.id },
            include: {
                customer: true,
                vehicle: true,
                deliveryAddress: true,
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
// Update an order
const updateOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status, customerId, vehicleId, deliveryAddressId, totalPrice, originalOrderId } = req.body;
        // Check if order exists
        const existingOrder = await prisma.order.findUnique({
            where: { id: orderId },
        });
        if (!existingOrder) {
            return res.status(404).json({ message: "Order not found" });
        }
        // Check if customer exists if updating customerId
        if (customerId) {
            const customer = await prisma.user.findUnique({
                where: { id: customerId },
            });
            if (!customer) {
                return res.status(404).json({ message: "Customer not found" });
            }
        }
        // Check if vehicle exists if updating vehicleId
        if (vehicleId) {
            const vehicle = await prisma.vehicle.findUnique({
                where: { id: vehicleId },
            });
            if (!vehicle) {
                return res.status(404).json({ message: "Vehicle not found" });
            }
        }
        // Check if delivery address exists if updating deliveryAddressId
        if (deliveryAddressId) {
            const deliveryAddress = await prisma.deliveryAddress.findUnique({
                where: { id: deliveryAddressId },
            });
            if (!deliveryAddress) {
                return res.status(404).json({ message: "Delivery address not found" });
            }
        }
        // Update the order
        const updatedOrder = await prisma.order.update({
            where: { id: orderId },
            data: {
                status,
                customerId,
                vehicleId,
                deliveryAddressId,
                totalPrice,
                originalOrderId,
            },
            include: {
                customer: true,
                vehicle: true,
                deliveryAddress: true,
                OrderItem: {
                    include: {
                        Product: true,
                        Customer: true,
                    },
                },
            },
        });
        res.json({ order: updatedOrder });
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
        // Restore product stock
        for (const item of order.OrderItem) {
            await prisma.product.update({
                where: { id: item.productId },
                data: {
                    stock: {
                        increment: item.quantity,
                    },
                },
            });
        }
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