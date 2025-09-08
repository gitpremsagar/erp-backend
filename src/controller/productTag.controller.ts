import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Create a new product tag
export const createProductTag = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    // Check if tag name already exists
    const existingTag = await prisma.productTag.findFirst({
      where: { name },
    });

    if (existingTag) {
      return res.status(409).json({ message: "Product tag with this name already exists" });
    }

    const productTag = await prisma.productTag.create({
      data: { name },
    });

    res.status(201).json({ productTag });
  } catch (error) {
    console.error("Error creating product tag:\n", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all product tags with pagination and filtering
export const getProductTags = async (req: Request, res: Response) => {
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

    const [productTags, total] = await Promise.all([
      prisma.productTag.findMany({
        where,
        skip,
        take: limitNum,
        include: {
          ProductTagRelation: {
            include: {
              Product: {
                select: {
                  id: true,
                  name: true,
                  productCode: true,
                  mrp: true,
                  description: true,
                  Category: {
                    select: {
                      id: true,
                      name: true,
                    },
                  },
                  SubCategory: {
                    select: {
                      id: true,
                      name: true,
                    },
                  },
                },
              },
            },
          },
          _count: {
            select: {
              ProductTagRelation: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
      }),
      prisma.productTag.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limitNum);

    res.json({
      productTags,
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
    console.error("Error fetching product tags:\n", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get a single product tag by ID
export const getProductTagById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const productTag = await prisma.productTag.findUnique({
      where: { id },
      include: {
        ProductTagRelation: {
          include: {
            Product: {
              select: {
                id: true,
                name: true,
                productCode: true,
                mrp: true,
              },
            },
          },
        },
        _count: {
          select: {
            ProductTagRelation: true,
          },
        },
      },
    });

    if (!productTag) {
      return res.status(404).json({ message: "Product tag not found" });
    }

    res.json({ productTag });
  } catch (error) {
    console.error("Error fetching product tag:\n", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update a product tag
export const updateProductTag = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    // Check if product tag exists
    const existingTag = await prisma.productTag.findUnique({
      where: { id },
    });

    if (!existingTag) {
      return res.status(404).json({ message: "Product tag not found" });
    }

    // If name is being updated, check for uniqueness
    if (name && name !== existingTag.name) {
      const duplicateTag = await prisma.productTag.findFirst({
        where: { name },
      });

      if (duplicateTag) {
        return res.status(409).json({ message: "Product tag with this name already exists" });
      }
    }

    const productTag = await prisma.productTag.update({
      where: { id },
      data: { name },
      include: {
        _count: {
          select: {
            ProductTagRelation: true,
          },
        },
      },
    });

    res.json({ productTag });
  } catch (error) {
    console.error("Error updating product tag:\n", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a product tag
export const deleteProductTag = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Check if product tag exists
    const existingTag = await prisma.productTag.findUnique({
      where: { id },
    });

    if (!existingTag) {
      return res.status(404).json({ message: "Product tag not found" });
    }

    // Check if tag is used in any product relations
    const tagRelations = await prisma.productTagRelation.findMany({
      where: { productTagId: id },
    });

    if (tagRelations.length > 0) {
      return res.status(400).json({
        message: "Cannot delete product tag as it is associated with existing products",
      });
    }

    await prisma.productTag.delete({
      where: { id },
    });

    res.json({ message: "Product tag deleted successfully" });
  } catch (error) {
    console.error("Error deleting product tag:\n", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get product tag statistics
export const getProductTagStats = async (req: Request, res: Response) => {
  try {
    const [totalTags, mostUsedTags, unusedTags] = await Promise.all([
      prisma.productTag.count(),
      prisma.productTag.findMany({
        include: {
          _count: {
            select: {
              ProductTagRelation: true,
            },
          },
        },
        orderBy: {
          ProductTagRelation: {
            _count: "desc",
          },
        },
        take: 5,
      }),
      prisma.productTag.findMany({
        where: {
          ProductTagRelation: {
            none: {},
          },
        },
        include: {
          _count: {
            select: {
              ProductTagRelation: true,
            },
          },
        },
      }),
    ]);

    res.json({
      stats: {
        totalTags,
        mostUsedTags,
        unusedTagsCount: unusedTags.length,
        unusedTags,
      },
    });
  } catch (error) {
    console.error("Error fetching product tag stats:\n", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
