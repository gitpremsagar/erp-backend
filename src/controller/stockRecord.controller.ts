import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Create a new stock record
export const createStockRecord = async (req: Request, res: Response) => {
  try {
    const {
      productId,
      stockBatchId,
      changeInStock,
      reason,
      createdBy,
    } = req.body;

    // Verify that product exists
    const product = await prisma.product.findUnique({ 
      where: { id: productId },
      include: { Category: true }
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Verify that stock batch exists
    const stockBatch = await prisma.stockBatch.findUnique({ 
      where: { id: stockBatchId },
      include: { 
        product: { include: { Category: true } },
        supplier: true 
      }
    });

    if (!stockBatch) {
      return res.status(404).json({ message: "Stock batch not found" });
    }

    // Verify that the stock batch belongs to the specified product
    if (stockBatch.productId !== productId) {
      return res.status(400).json({ 
        message: "Stock batch does not belong to the specified product" 
      });
    }

    // Verify that user exists
    const user = await prisma.user.findUnique({ 
      where: { id: createdBy },
      select: { id: true, name: true, email: true, userType: true }
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the change would result in negative stock
    const currentStock = stockBatch.stockQuantity;
    const newStock = currentStock + changeInStock;
    
    if (newStock < 0) {
      return res.status(400).json({ 
        message: `Insufficient stock. Current stock: ${currentStock}, attempting to change by: ${changeInStock}` 
      });
    }

    // Create stock record
    const stockRecord = await prisma.stockRecord.create({
      data: {
        productId,
        stockBatchId,
        changeInStock,
        reason,
        createdBy,
      },
      include: {
        Product: {
          include: {
            Category: true,
          },
        },
        StockBatch: {
          include: {
            product: { include: { Category: true } },
            supplier: true,
          },
        },
        User: {
          select: {
            id: true,
            name: true,
            email: true,
            userType: true,
          },
        },
      },
    });

    // Update the stock batch quantity
    await prisma.stockBatch.update({
      where: { id: stockBatchId },
      data: { stockQuantity: newStock },
    });

    res.status(201).json({ 
      stockRecord,
      updatedStockQuantity: newStock 
    });
  } catch (error) {
    console.error("Error creating stock record:\n", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all stock records with pagination and filtering
export const getStockRecords = async (req: Request, res: Response) => {
  try {
    const {
      page = 1,
      limit = 10,
      search,
      productId,
      stockBatchId,
      reason,
      createdBy,
      dateFrom,
      dateTo,
    } = req.query as any;

    // Convert string values to numbers
    const pageNum = parseInt(page as string, 10) || 1;
    const limitNum = parseInt(limit as string, 10) || 10;
    
    const skip = (pageNum - 1) * limitNum;

    // Build where clause
    const where: any = {};

    if (search) {
      where.OR = [
        { Product: { name: { contains: search, mode: "insensitive" } } },
        { Product: { productCode: { contains: search, mode: "insensitive" } } },
        { User: { name: { contains: search, mode: "insensitive" } } },
        { User: { email: { contains: search, mode: "insensitive" } } },
      ];
    }

    if (productId) {
      where.productId = productId;
    }

    if (stockBatchId) {
      where.stockBatchId = stockBatchId;
    }

    if (reason) {
      where.reason = reason;
    }

    if (createdBy) {
      where.createdBy = createdBy;
    }

    if (dateFrom || dateTo) {
      where.createdAt = {};
      if (dateFrom) {
        where.createdAt.gte = new Date(dateFrom);
      }
      if (dateTo) {
        where.createdAt.lte = new Date(dateTo);
      }
    }

    const [stockRecords, total] = await Promise.all([
      prisma.stockRecord.findMany({
        where,
        skip,
        take: limitNum,
        include: {
          Product: {
            include: {
              Category: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
          StockBatch: {
            include: {
              product: { include: { Category: true } },
              supplier: true,
            },
          },
          User: {
            select: {
              id: true,
              name: true,
              email: true,
              userType: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
      }),
      prisma.stockRecord.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limitNum);

    res.json({
      stockRecords,
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
    console.error("Error fetching stock records:\n", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get a single stock record by ID
export const getStockRecordById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const stockRecord = await prisma.stockRecord.findUnique({
      where: { id },
      include: {
        Product: {
          include: {
            Category: true,
          },
        },
        StockBatch: {
          include: {
            product: { include: { Category: true } },
            supplier: true,
          },
        },
        User: {
          select: {
            id: true,
            name: true,
            email: true,
            userType: true,
          },
        },
        Order: {
          select: {
            id: true,
            customeOrderId: true,
            status: true,
            totalPrice: true,
            orderDate: true,
          },
        },
      },
    });

    if (!stockRecord) {
      return res.status(404).json({ message: "Stock record not found" });
    }

    res.json({ stockRecord });
  } catch (error) {
    console.error("Error fetching stock record:\n", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update a stock record
export const updateStockRecord = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Check if stock record exists
    const existingStockRecord = await prisma.stockRecord.findUnique({
      where: { id },
      include: {
        StockBatch: true,
      },
    });

    if (!existingStockRecord) {
      return res.status(404).json({ message: "Stock record not found" });
    }

    // If changeInStock is being updated, we need to recalculate the stock batch quantity
    if (updateData.changeInStock !== undefined) {
      const originalChange = existingStockRecord.changeInStock;
      const newChange = updateData.changeInStock;
      const difference = newChange - originalChange;
      
      const currentStock = existingStockRecord.StockBatch.stockQuantity;
      const newStock = currentStock + difference;
      
      if (newStock < 0) {
        return res.status(400).json({ 
          message: `Insufficient stock. Current stock: ${currentStock}, attempting to change by: ${difference}` 
        });
      }

      // Update the stock batch quantity
      await prisma.stockBatch.update({
        where: { id: existingStockRecord.stockBatchId },
        data: { stockQuantity: newStock },
      });
    }

    const stockRecord = await prisma.stockRecord.update({
      where: { id },
      data: updateData,
      include: {
        Product: {
          include: {
            Category: true,
          },
        },
        StockBatch: {
          include: {
            product: { include: { Category: true } },
            supplier: true,
          },
        },
        User: {
          select: {
            id: true,
            name: true,
            email: true,
            userType: true,
          },
        },
      },
    });

    res.json({ stockRecord });
  } catch (error) {
    console.error("Error updating stock record:\n", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// // Delete a stock record
// export const deleteStockRecord = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;

//     // Check if stock record exists
//     const existingStockRecord = await prisma.stockRecord.findUnique({
//       where: { id },
//       include: {
//         StockBatch: true,
//         Order: true,
//       },
//     });

//     if (!existingStockRecord) {
//       return res.status(404).json({ message: "Stock record not found" });
//     }

//     // Check if stock record is used in any orders
//     if (existingStockRecord.Order && existingStockRecord.Order.length > 0) {
//       return res.status(400).json({
//         message: "Cannot delete stock record as it is associated with orders",
//       });
//     }

//     // Revert the stock batch quantity
//     const currentStock = existingStockRecord.StockBatch.stockQuantity;
//     const revertedStock = currentStock - existingStockRecord.changeInStock;
    
//     if (revertedStock < 0) {
//       return res.status(400).json({
//         message: "Cannot delete stock record as it would result in negative stock",
//       });
//     }

//     // Update the stock batch quantity
//     await prisma.stockBatch.update({
//       where: { id: existingStockRecord.stockBatchId },
//       data: { stockQuantity: revertedStock },
//     });

//     // Delete the stock record
//     await prisma.stockRecord.delete({
//       where: { id },
//     });

//     res.json({ 
//       message: "Stock record deleted successfully",
//       revertedStockQuantity: revertedStock 
//     });
//   } catch (error) {
//     console.error("Error deleting stock record:\n", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// Get stock records by product ID
export const getStockRecordsByProductId = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const {
      page = 1,
      limit = 10,
      reason,
      dateFrom,
      dateTo,
    } = req.query as any;

    // Convert string values to numbers
    const pageNum = parseInt(page as string, 10) || 1;
    const limitNum = parseInt(limit as string, 10) || 10;
    
    const skip = (pageNum - 1) * limitNum;

    // Verify that product exists
    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: {
        Category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Build where clause
    const where: any = {
      productId: productId,
    };

    if (reason) {
      where.reason = reason;
    }

    if (dateFrom || dateTo) {
      where.createdAt = {};
      if (dateFrom) {
        where.createdAt.gte = new Date(dateFrom);
      }
      if (dateTo) {
        where.createdAt.lte = new Date(dateTo);
      }
    }

    const [stockRecords, total] = await Promise.all([
      prisma.stockRecord.findMany({
        where,
        skip,
        take: limitNum,
        include: {
          Product: {
            include: {
              Category: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
          StockBatch: {
            include: {
              product: { include: { Category: true } },
              supplier: true,
            },
          },
          User: {
            select: {
              id: true,
              name: true,
              email: true,
              userType: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
      }),
      prisma.stockRecord.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limitNum);

    res.json({
      product,
      stockRecords,
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
    console.error("Error fetching stock records by product ID:\n", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get stock records by stock batch ID
export const getStockRecordsByStockBatchId = async (req: Request, res: Response) => {
  try {
    const { stockBatchId } = req.params;
    const {
      page = 1,
      limit = 10,
      reason,
      dateFrom,
      dateTo,
    } = req.query as any;

    // Convert string values to numbers
    const pageNum = parseInt(page as string, 10) || 1;
    const limitNum = parseInt(limit as string, 10) || 10;
    
    const skip = (pageNum - 1) * limitNum;

    // Verify that stock batch exists
    const stockBatch = await prisma.stockBatch.findUnique({
      where: { id: stockBatchId },
      include: {
        product: { 
          include: { 
            Category: {
              select: {
                id: true,
                name: true,
              },
            },
          } 
        },
        supplier: true,
      },
    });

    if (!stockBatch) {
      return res.status(404).json({ message: "Stock batch not found" });
    }

    // Build where clause
    const where: any = {
      stockBatchId: stockBatchId,
    };

    if (reason) {
      where.reason = reason;
    }

    if (dateFrom || dateTo) {
      where.createdAt = {};
      if (dateFrom) {
        where.createdAt.gte = new Date(dateFrom);
      }
      if (dateTo) {
        where.createdAt.lte = new Date(dateTo);
      }
    }

    const [stockRecords, total] = await Promise.all([
      prisma.stockRecord.findMany({
        where,
        skip,
        take: limitNum,
        include: {
          Product: {
            include: {
              Category: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
          StockBatch: {
            include: {
              product: { include: { Category: true } },
              supplier: true,
            },
          },
          User: {
            select: {
              id: true,
              name: true,
              email: true,
              userType: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
      }),
      prisma.stockRecord.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limitNum);

    res.json({
      stockBatch,
      stockRecords,
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
    console.error("Error fetching stock records by stock batch ID:\n", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get stock record statistics
export const getStockRecordStats = async (req: Request, res: Response) => {
  try {
    const [
      totalStockRecords,
      arrivalRecords,
      deliveryRecords,
      correctionRecords,
      totalStockIn,
      totalStockOut,
    ] = await Promise.all([
      prisma.stockRecord.count(),
      prisma.stockRecord.count({
        where: { reason: "ARRIVAL_FROM_SUPPLIER" },
      }),
      prisma.stockRecord.count({
        where: { reason: "DELIVERED_TO_CUSTOMER" },
      }),
      prisma.stockRecord.count({
        where: { reason: "CORRECTION_BY_ADMIN" },
      }),
      prisma.stockRecord.aggregate({
        where: { changeInStock: { gt: 0 } },
        _sum: { changeInStock: true },
      }),
      prisma.stockRecord.aggregate({
        where: { changeInStock: { lt: 0 } },
        _sum: { changeInStock: true },
      }),
    ]);

    // Get recent activity (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recentActivity = await prisma.stockRecord.count({
      where: {
        createdAt: { gte: thirtyDaysAgo },
      },
    });

    res.json({
      stats: {
        totalStockRecords,
        arrivalRecords,
        deliveryRecords,
        correctionRecords,
        totalStockIn: totalStockIn._sum.changeInStock || 0,
        totalStockOut: Math.abs(totalStockOut._sum.changeInStock || 0),
        recentActivity,
      },
    });
  } catch (error) {
    console.error("Error fetching stock record stats:\n", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
