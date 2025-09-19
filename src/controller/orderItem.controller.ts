import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Create a new order item
export const createOrderItem = async (req: Request, res: Response) => {
  try {
    const {
      orderId,
      productId,
      quantity,
      customerId,
      orderCompleted = false,
    } = req.body;

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

    // Calculate current stock from stock records
    const stockRecords = await prisma.stockRecord.findMany({
      where: { productId },
    });
    
    const currentStock = stockRecords.reduce((total, record) => total + record.changeInStock, 0);
    
    // Check if product has sufficient stock
    if (currentStock < quantity) {
      return res.status(400).json({ 
        message: `Insufficient stock. Available: ${currentStock}, Requested: ${quantity}` 
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
          },
        },
        Customer: true,
      },
    });

    res.status(201).json({ orderItem });
  } catch (error) {
    console.error("Error creating order item:\n", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all order items with pagination and filtering
export const getOrderItems = async (req: Request, res: Response) => {
  try {
    const {
      page = "1",
      limit = "10",
      orderId,
      productId,
      orderCompleted,
    } = req.query as any;

    // Convert string parameters to numbers
    const pageNum = parseInt(page as string, 10);
    const limitNum = parseInt(limit as string, 10);
    
    // Validate parameters
    if (isNaN(pageNum) || isNaN(limitNum) || pageNum < 1 || limitNum < 1) {
      return res.status(400).json({ 
        message: "Invalid pagination parameters. Page and limit must be positive numbers." 
      });
    }

    const skip = (pageNum - 1) * limitNum;

    // Build where clause
    const where: any = {};

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
  } catch (error) {
    console.error("Error fetching order items:\n", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get a single order item by ID
export const getProducOrderHistory = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    const productOrderHistory = await prisma.orderItem.findMany({
      where: { productId },
      include: {
        Order: true,
        Product: {
          include: {
            Category: true,
          },
        },
        Customer: true,
      },
    });

    if (!productOrderHistory) {
      return res.status(404).json({ message: "Product order history not found" });
    }

    res.json({ productOrderHistory });
  } catch (error) {
    console.error("Error fetching produc order history:\n", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get a history of product order by customer id and product id
export const getCustomerProductOrderHistory = async (req: Request, res: Response) => {
  try {
    const { customerId, productId } = req.params;
    const customerProductOrderHistory = await prisma.orderItem.findMany({
      where: { customerId, productId },
      include: {
        Order: true,
        Product: true,
      },
    });
  } catch (error) {
    console.error("Error fetching customer product order history:\n", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update an order item
export const updateOrderItem = async (req: Request, res: Response) => {
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
        // Calculate current stock from stock records
        const stockRecords = await prisma.stockRecord.findMany({
          where: { productId: existingOrderItem.productId },
        });
        
        const currentStock = stockRecords.reduce((total, record) => total + record.changeInStock, 0);
        
        // Check if product has sufficient stock for increase
        if (currentStock < quantityDifference) {
          return res.status(400).json({ 
            message: `Insufficient stock. Available: ${currentStock}, Additional needed: ${quantityDifference}` 
          });
        }
      }

      // Stock is managed through StockRecord, no direct update needed

      // Create stock entry record
      await prisma.stockRecord.create({
        data: {
          productId: existingOrderItem.productId,
          changeInStock: -quantityDifference,
          createdBy: "system", // TODO: Replace with actual user ID when auth is implemented
          stockBatchId: "default", // TODO: Replace with actual stock batch ID
          reason: "DELIVERED_TO_CUSTOMER",
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
          },
        },
        Customer: true,
      },
    });

    res.json({ orderItem });
  } catch (error) {
    console.error("Error updating order item:\n", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete an order item
export const deleteOrderItem = async (req: Request, res: Response) => {
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

    // Stock is managed through StockRecord, no direct update needed

    // Create stock entry record
    await prisma.stockRecord.create({
      data: {
        productId: existingOrderItem.productId,
        changeInStock: existingOrderItem.quantity,
        createdBy: "system", // TODO: Replace with actual user ID when auth is implemented
        stockBatchId: "default", // TODO: Replace with actual stock batch ID
        reason: "CORRECTION_BY_ADMIN",
      },
    });

    // Delete the order item
    await prisma.orderItem.delete({
      where: { id },
    });

    res.json({ message: "Order item deleted successfully" });
  } catch (error) {
    console.error("Error deleting order item:\n", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get order item statistics
export const getOrderItemStats = async (req: Request, res: Response) => {
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
  } catch (error) {
    console.error("Error fetching order item stats:\n", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
