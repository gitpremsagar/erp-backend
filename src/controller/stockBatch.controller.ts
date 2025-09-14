import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Create a new stock entry
export const createStockBatch = async (req: Request, res: Response) => {
  try {
    const {
      productId,
      manufacturingDate,
      arrivalDate,
      validityMonths,
      supplierName,
      supplierId,
      stockQuantity,
      isArchived,
    } = req.body;

    // Verify that product exists
    const product = await prisma.product.findUnique({ where: { id: productId } });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Calculate expiry date
    const manufacturingDateObj = new Date(manufacturingDate);
    const expiryDate = new Date(manufacturingDateObj);
    expiryDate.setMonth(expiryDate.getMonth() + (validityMonths || 1));

    // Verify that supplier exists if supplierId is provided
    if (supplierId) {
      const supplier = await prisma.supplier.findUnique({ where: { id: supplierId } });
      if (!supplier) {
        return res.status(404).json({ message: "Supplier not found" });
      }
    }

    // Create stock entry
    const stock = await prisma.stockBatch.create({
      data: {
        productId,
        manufacturingDate: manufacturingDateObj,
        arrivalDate: new Date(arrivalDate),
        validityMonths: validityMonths || 1,
        expiryDate,
        supplierName,
        supplierId,
        stockQuantity: stockQuantity || 0,
        isArchived: isArchived || false,
      },
      include: {
        product: {
          include: {
            Category: true,
          },
        },
        supplier: true,
      },
    });

    res.status(201).json({ stock });
  } catch (error) {
    console.error("Error creating stock:\n", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all stock entries with pagination and filtering
export const getStockBatches = async (req: Request, res: Response) => {
  try {
    const {
      page = 1,
      limit = 10,
      search,
      productId,
      supplierName,
      isArchived,
      expired,
      lowStock,
    } = req.query as any;

    // Convert string values to numbers
    const pageNum = parseInt(page as string, 10) || 1;
    const limitNum = parseInt(limit as string, 10) || 10;
    
    const skip = (pageNum - 1) * limitNum;

    // Build where clause
    const where: any = {};

    if (search) {
      where.OR = [
        { supplierName: { contains: search, mode: "insensitive" } },
        { product: { name: { contains: search, mode: "insensitive" } } },
      ];
    }

    if (productId) {
      where.productId = productId;
    }

    if (supplierName) {
      where.supplierName = { contains: supplierName, mode: "insensitive" };
    }

    if (isArchived !== undefined) {
      where.isArchived = isArchived;
    }

    if (expired !== undefined) {
      if (expired) {
        where.expiryDate = { lt: new Date() };
      } else {
        where.expiryDate = { gte: new Date() };
      }
    }

    if (lowStock !== undefined) {
      if (lowStock) {
        where.AND = [
          { stockQuantity: { gt: 0 } },
          {
            product: {
              lowStockLimit: { gt: 0 },
            },
          },
        ];
        // This is a simplified check - you might want to implement more sophisticated logic
        where.stockQuantity = { lte: 10 }; // Example threshold
      }
    }

    const [stockBatches, total] = await Promise.all([
      prisma.stockBatch.findMany({
        where,
        skip,
        take: limitNum,
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
          supplier: true,
          StockRecord: {
            orderBy: { createdAt: "desc" },
            // take: 5, // Get last 5 stock records
          },
        },
        orderBy: { createdAt: "desc" },
      }),
      prisma.stockBatch.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limitNum);

    res.json({
      stockBatches,
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
    console.error("Error fetching stocks:\n", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get a single stock entry by ID
export const getStockBatchById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const stockBatch = await prisma.stockBatch.findUnique({
      where: { id },
      include: {
        product: {
          include: {
            Category: true,
          },
        },
        supplier: true,
        StockRecord: {
          orderBy: { createdAt: "desc" },
          include: {
            User: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });

    if (!stockBatch) {
      return res.status(404).json({ message: "Stock not found" });
    }

    res.json({ stockBatch });
  } catch (error) {
    console.error("Error fetching stock:\n", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


// Update a stock entry
export const updateStockBatch = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Check if stock exists
    const existingStockBatch = await prisma.stockBatch.findUnique({
      where: { id },
    });

    if (!existingStockBatch) {
      return res.status(404).json({ message: "Stock not found" });
    }

    // Verify that product exists if it's being updated
    if (updateData.productId) {
      const product = await prisma.product.findUnique({
        where: { id: updateData.productId },
      });
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
    }

    // Verify that supplier exists if supplierId is being updated
    if (updateData.supplierId) {
      const supplier = await prisma.supplier.findUnique({
        where: { id: updateData.supplierId },
      });
      if (!supplier) {
        return res.status(404).json({ message: "Supplier not found" });
      }
    }

    // Recalculate expiry date if manufacturing date or validity months are updated
    if (updateData.manufacturingDate || updateData.validityMonths) {
      const manufacturingDate = updateData.manufacturingDate 
        ? new Date(updateData.manufacturingDate)
        : existingStockBatch.manufacturingDate;
      const validityMonths = updateData.validityMonths || existingStockBatch.validityMonths;
      
      const expiryDate = new Date(manufacturingDate);
      expiryDate.setMonth(expiryDate.getMonth() + validityMonths);
      
      updateData.expiryDate = expiryDate;
    }

    // Convert date strings to Date objects
    if (updateData.manufacturingDate) {
      updateData.manufacturingDate = new Date(updateData.manufacturingDate);
    }
    if (updateData.arrivalDate) {
      updateData.arrivalDate = new Date(updateData.arrivalDate);
    }

    const stockBatch = await prisma.stockBatch.update({
      where: { id },
      data: updateData,
      include: {
        product: {
          include: {
            Category: true,
          },
        },
        supplier: true,
      },
    });

    res.json({ stockBatch });
  } catch (error) {
    console.error("Error updating stock:\n", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a stock entry
export const deleteStockBatch = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Check if stock exists
    const existingStockBatch = await prisma.stockBatch.findUnique({
      where: { id },
    });

    if (!existingStockBatch) {
      return res.status(404).json({ message: "Stock not found" });
    }

    // TODO: delete related stock records
    // Check if stock is used in any stock records
    const stockRecords = await prisma.stockRecord.findMany({
      where: { stockBatchId: existingStockBatch.id },
    });

    if (stockRecords.length > 0) {
      return res.status(400).json({
        message: "Cannot delete stock as it has associated stock records",
      });
    }

    // Delete the stock batch
    await prisma.stockBatch.delete({
      where: { id },
    });

    res.json({ message: "Stock batch deleted successfully" });
  } catch (error) {
    console.error("Error deleting stock:\n", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Archive/Unarchive stock
export const toggleStockArchive = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { isArchived } = req.body;

    // Check if stock exists
    const existingStockBatch = await prisma.stockBatch.findUnique({
      where: { id },
    });

    if (!existingStockBatch) {
      return res.status(404).json({ message: "Stock not found" });
    }

    const stockBatch = await prisma.stockBatch.update({
      where: { id },
      data: { isArchived },
      include: {
        product: {
          include: {
            Category: true,
          },
        },
        supplier: true,
      },
    });

    res.json({ stockBatch });
  } catch (error) {
    console.error("Error toggling stock archive:\n", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get stock statistics
export const getStockStats = async (req: Request, res: Response) => {
  try {
    const [
      totalStockBatches,
      totalValue,
      expiredStocks,
      lowStockCount,
      archivedStockBatches,
    ] = await Promise.all([
      prisma.stockBatch.count(),
      prisma.stockBatch.aggregate({
        _sum: {
          stockQuantity: true,
        },
      }),
      prisma.stockBatch.count({
        where: {
          expiryDate: { lt: new Date() },
        },
      }),
      prisma.stockBatch.count({
        where: {
          stockQuantity: { lte: 10 }, // Example threshold
        },
      }),
      prisma.stockBatch.count({
        where: {
          isArchived: true,
        },
      }),
    ]);

    // Calculate total inventory value
    const stocksWithProducts = await prisma.stockBatch.findMany({
      include: {
        product: {
          select: {
            mrp: true,
          },
        },
        supplier: true,
      },
    });

    const totalInventoryValue = stocksWithProducts.reduce(
      (sum, stock) => sum + (stock.product.mrp * stock.stockQuantity),
      0
    );

    res.json({
      stats: {
        totalStockBatches,
        totalQuantity: totalValue._sum.stockQuantity || 0,
        totalInventoryValue,
        expiredStocks,
        lowStockCount,
        archivedStockBatches,
        activeStockBatches: totalStockBatches - archivedStockBatches,
      },
    });
  } catch (error) {
    console.error("Error fetching stock stats:\n", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get stock batches by product ID
export const getStockBatchesByProductId = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const {
      page = 1,
      limit = 10,
      isArchived,
      expired,
      lowStock,
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

    if (isArchived !== undefined) {
      where.isArchived = isArchived === 'true';
    }

    if (expired !== undefined) {
      if (expired === 'true') {
        where.expiryDate = { lt: new Date() };
      } else {
        where.expiryDate = { gte: new Date() };
      }
    }

    if (lowStock !== undefined && lowStock === 'true') {
      where.AND = [
        { stockQuantity: { gt: 0 } },
        {
          product: {
            lowStockLimit: { gt: 0 },
          },
        },
      ];
      // This is a simplified check - you might want to implement more sophisticated logic
      where.stockQuantity = { lte: 10 }; // Example threshold
    }

    const [stockBatches, total] = await Promise.all([
      prisma.stockBatch.findMany({
        where,
        skip,
        take: limitNum,
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
          supplier: true,
          StockRecord: {
            orderBy: { createdAt: "desc" },
            take: 5, // Get last 5 stock records
          },
        },
        orderBy: { createdAt: "desc" },
      }),
      prisma.stockBatch.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limitNum);

    res.json({
      product,
      stockBatches,
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
    console.error("Error fetching stock batches by product ID:\n", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get stock alerts (expired, low stock, etc.)
export const getStockAlerts = async (req: Request, res: Response) => {
  try {
    const [expiredStocks, lowStockItems, expiringSoon] = await Promise.all([
      // Expired stocks
      prisma.stockBatch.findMany({
        where: {
          expiryDate: { lt: new Date() },
          isArchived: false,
        },
        include: {
          product: {
            select: {
              name: true,
              productCode: true,
            },
          },
          supplier: true,
        },
        orderBy: { expiryDate: "asc" },
      }),
      // Low stock items
      prisma.stockBatch.findMany({
        where: {
          stockQuantity: { lte: 10 }, // Example threshold
          isArchived: false,
        },
        include: {
          product: {
            select: {
              name: true,
              productCode: true,
              lowStockLimit: true,
            },
          },
        },
        orderBy: { stockQuantity: "asc" },
      }),
      // Expiring soon (within 30 days)
      prisma.stockBatch.findMany({
        where: {
          expiryDate: {
            gte: new Date(),
            lte: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
          },
          isArchived: false,
        },
        include: {
          product: {
            select: {
              name: true,
              productCode: true,
            },
          },
          supplier: true,
        },
        orderBy: { expiryDate: "asc" },
      }),
    ]);

    res.json({
      alerts: {
        expired: expiredStocks,
        lowStock: lowStockItems,
        expiringSoon,
        totalAlerts: expiredStocks.length + lowStockItems.length + expiringSoon.length,
      },
    });
  } catch (error) {
    console.error("Error fetching stock alerts:\n", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
