import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Create a new supplier
export const createSupplier = async (req: Request, res: Response) => {
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
  } catch (error) {
    console.error("Error creating supplier:\n", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all suppliers with pagination and filtering
export const getSuppliers = async (req: Request, res: Response) => {
  try {
    const {
      page = 1,
      limit = 10,
      search,
    } = req.query as any;

    // Convert string values to numbers
    const pageNum = parseInt(page as string, 10) || 1;
    const limitNum = parseInt(limit as string, 10) || 10;
    
    const skip = (pageNum - 1) * limitNum;

    // Build where clause
    const where: any = {};

    if (search) {
      where.name = { contains: search, mode: "insensitive" };
    }

    const [suppliers, total] = await Promise.all([
      prisma.supplier.findMany({
        where,
        skip,
        take: limitNum,
        include: {
          Stock: {
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
  } catch (error) {
    console.error("Error fetching suppliers:\n", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get a single supplier by ID
export const getSupplierById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const supplier = await prisma.supplier.findUnique({
      where: { id },
      include: {
        Stock: {
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
  } catch (error) {
    console.error("Error fetching supplier:\n", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update a supplier
export const updateSupplier = async (req: Request, res: Response) => {
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
        Stock: {
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
  } catch (error) {
    console.error("Error updating supplier:\n", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a supplier
export const deleteSupplier = async (req: Request, res: Response) => {
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
    const stockRecords = await prisma.stock.findMany({
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
  } catch (error) {
    console.error("Error deleting supplier:\n", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get supplier statistics
export const getSupplierStats = async (req: Request, res: Response) => {
  try {
    const [
      totalSuppliers,
      suppliersWithStock,
      totalStockValue,
    ] = await Promise.all([
      prisma.supplier.count(),
      prisma.supplier.count({
        where: {
          Stock: {
            some: {
              stockQuantity: { gt: 0 },
            },
          },
        },
      }),
      prisma.stock.aggregate({
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
        Stock: {
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

    const totalInventoryValue = suppliersWithProducts.reduce(
      (sum, supplier) => {
        const supplierValue = supplier.Stock.reduce(
          (stockSum, stock) => stockSum + (stock.product.mrp * stock.stockQuantity),
          0
        );
        return sum + supplierValue;
      },
      0
    );

    res.json({
      stats: {
        totalSuppliers,
        suppliersWithStock,
        totalStockQuantity: totalStockValue._sum.stockQuantity || 0,
        totalInventoryValue,
        averageStockPerSupplier: totalSuppliers > 0 ? (totalStockValue._sum.stockQuantity || 0) / totalSuppliers : 0,
      },
    });
  } catch (error) {
    console.error("Error fetching supplier stats:\n", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
