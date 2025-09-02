import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Create a new order
export const createOrder = async (req: Request, res: Response) => {
  try {
    const { customerId, orderItems } = req.body;

    // Check if customer exists
    const customer = await prisma.user.findUnique({
      where: { id: customerId },
    });

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // Check if all products exist
    for (const item of orderItems) {
      const product = await prisma.product.findUnique({
        where: { id: item.productId },
      });

      if (!product) {
        return res.status(404).json({ message: `Product with ID ${item.productId} not found` });
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
        },
        include: {
          customer: true,
        },
      });

      // Create order items and update product stock
      for (const item of orderItems) {
        await tx.orderItem.create({
          data: {
            orderId: newOrder.id,
            productId: item.productId,
            quantity: item.quantity,
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
        OrderItem: {
          include: {
            Product: true,
          },
        },
      },
    });

    res.status(201).json({ order: completeOrder });
  } catch (error) {
    console.error("Error creating order:\n", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all orders with pagination and filtering
export const getOrders = async (req: Request, res: Response) => {
  try {
    const {
      page = 1,
      limit = 10,
      status,
      customerId,
      startDate,
      endDate,
    } = req.query;

    const skip = (Number(page) - 1) * Number(limit);

    // Build where clause
    const where: any = {};
    
    if (status) {
      where.status = status;
    }
    
    if (customerId) {
      where.customerId = customerId;
    }
    
    if (startDate || endDate) {
      where.orderDate = {};
      if (startDate) {
        where.orderDate.gte = new Date(startDate as string);
      }
      if (endDate) {
        where.orderDate.lte = new Date(endDate as string);
      }
    }

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        skip,
        take: Number(limit),
        include: {
          customer: true,
          OrderItem: {
            include: {
              Product: true,
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
  } catch (error) {
    console.error("Error fetching orders:\n", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get order statistics
export const getOrderStats = async (req: Request, res: Response) => {
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
  } catch (error) {
    console.error("Error fetching order statistics:\n", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get a single order by ID
export const getOrderById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        customer: true,
        OrderItem: {
          include: {
            Product: true,
          },
        },
      },
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({ order });
  } catch (error) {
    console.error("Error fetching order:\n", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete an order
export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Check if order exists
    const order = await prisma.order.findUnique({
      where: { id },
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
        where: { orderId: id },
      });
      
      await tx.order.delete({
        where: { id },
      });
    });

    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("Error deleting order:\n", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
