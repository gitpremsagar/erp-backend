import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Create a new product
export const createProduct = async (req: Request, res: Response) => {
  try {
    const {
      name,
      mrp,
      productCode,
      lowStockLimit,
      overStockLimit,
      categoryId,
      grammage,
      imageUrl,
      tagIds,
    } = req.body;

    // Check if product code already exists
    const existingProduct = await prisma.product.findUnique({
      where: { productCode },
    });

    if (existingProduct) {
      return res.status(409).json({ message: "Product code already exists" });
    }

    // Verify that category exists
    const category = await prisma.category.findUnique({ where: { id: categoryId } });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Create product and tag relations in a transaction
    const result = await prisma.$transaction(async (tx) => {
      // Create the product
      const product = await tx.product.create({
        data: {
          name,
          mrp,
          productCode,
          lowStockLimit: lowStockLimit || 0,
          overStockLimit: overStockLimit || 0,
          categoryId,
          grammage,
          imageUrl,
        },
        include: {
          Category: true,
        },
      });


      // Create product tag relations if tagIds are provided
      const tagRelations = [];
      if (tagIds && tagIds.length > 0) {
        // Verify that all tag IDs exist
        const existingTags = await tx.productTag.findMany({
          where: { id: { in: tagIds } },
        });

        if (existingTags.length !== tagIds.length) {
          throw new Error("One or more tag IDs do not exist");
        }

        // Create the relations
        for (const tagId of tagIds) {
          const relation = await tx.productTagRelation.create({
            data: {
              productId: product.id,
              productTagId: tagId,
            },
          });

          tagRelations.push(relation);
        }
      }

      return { product, tagRelations };
    });

    res.status(201).json({
      product: result.product,
      tagRelations: result.tagRelations,
    });
  } catch (error) {
    console.error("Error creating product:\n", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all products with pagination and filtering
export const getProducts = async (req: Request, res: Response) => {
  // console.log("getProducts");
  try {
    const {
      page = 1,
      limit = 10,
      search,
      categoryId,
      minPrice,
      maxPrice,
      productTagIds,
    } = req.query as any;

    // Convert string values to numbers
    const pageNum = parseInt(page as string, 10) || 1;
    const limitNum = parseInt(limit as string, 10) || 10;
    
    const skip = (pageNum - 1) * limitNum;

    // Build where clause
    const where: any = {};

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { productCode: { contains: search, mode: "insensitive" } },
      ];
    }

    if (categoryId) {
      where.categoryId = categoryId;
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      where.mrp = {};
      if (minPrice !== undefined) where.mrp.gte = minPrice;
      if (maxPrice !== undefined) where.mrp.lte = maxPrice;
    }

    if (productTagIds) {
      // Handle both single tag ID and multiple tag IDs
      const tagIds = Array.isArray(productTagIds) 
        ? productTagIds 
        : productTagIds.split(',').map((id: string) => id.trim());
      
      where.ProductTagRelation = {
        some: {
          productTagId: {
            in: tagIds,
          },
        },
      };
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        skip,
        take: limitNum,
        include: {
          Category: {
            select: {
              id: true,
              name: true,
            },
          },
          ProductTagRelation: {            
            include: {
              ProductTag: {
                select: {
                  id: true,
                  name: true,
                }
              }
            },
          },
          StockBatch: {
            select: {
              id: true,
              manufacturingDate: true,
              arrivalDate: true,
              validityMonths: true,
              expiryDate: true,
              stockQuantity: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
      }),
      prisma.product.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limitNum);

    res.json({
      products,
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
    console.error("Error fetching products:\n", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get a single product by ID
export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const product = await prisma.product.findUnique({
      where: { id },
        include: {
          Category: true,
          ProductTagRelation: {
            include: {
              ProductTag: true,
            },
          },
          StockBatch: true,
          StockRecord: {
            orderBy: { createdAt: "desc" },
          },
        },
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ product });
  } catch (error) {
    console.error("Error fetching product:\n", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update a product
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Check if product exists
    const existingProduct = await prisma.product.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    // If product code is being updated, check for uniqueness
    if (
      updateData.productCode &&
      updateData.productCode !== existingProduct.productCode
    ) {
      const duplicateProduct = await prisma.product.findUnique({
        where: { productCode: updateData.productCode },
      });

      if (duplicateProduct) {
        return res.status(409).json({ message: "Product code already exists" });
      }
    }

    // Verify that category exists if it's being updated
    if (updateData.categoryId) {
      const category = await prisma.category.findUnique({
        where: { id: updateData.categoryId },
      });
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
    }

    // Handle tag updates if provided
    let tagRelations = [];
    if (updateData.tagIds) {
      // Remove existing tag relations
      await prisma.productTagRelation.deleteMany({
        where: { productId: id },
      });

      // Verify that all tag IDs exist
      const existingTags = await prisma.productTag.findMany({
        where: { id: { in: updateData.tagIds } },
      });

      if (existingTags.length !== updateData.tagIds.length) {
        return res.status(400).json({ message: "One or more tag IDs do not exist" });
      }

      // Create new tag relations
      for (const tagId of updateData.tagIds) {
        const relation = await prisma.productTagRelation.create({
          data: {
            productId: id,
            productTagId: tagId,
          },
        });

        tagRelations.push(relation);
      }

      // Remove tagIds from updateData as it's handled separately
      delete updateData.tagIds;
    }

    const product = await prisma.product.update({
      where: { id },
      data: updateData,
      include: {
        Category: true,
        ProductTagRelation: {
          include: {
            ProductTag: true,
          },
        },
      },
    });

    res.json({ product, tagRelations });
  } catch (error) {
    console.error("Error updating product:\n", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a product
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Check if product exists
    const existingProduct = await prisma.product.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if product is used in any orders
    const orderItems = await prisma.orderItem.findMany({
      where: { productId: id },
    });

    if (orderItems.length > 0) {
      console.log("orderItems", orderItems, "\n cannot delete product as it is associated with existing orders");
      return res.status(400).json({
        message:
          "Cannot delete product as it is associated with existing orders",
      });
    }

    // Delete related ProductTagRelation records first
    await prisma.productTagRelation.deleteMany({
      where: { productId: id }
    });

    // Now delete the product
    await prisma.product.delete({
      where: { id },
    });

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:\n", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get product statistics
export const getProductStats = async (req: Request, res: Response) => {
  try {
    const [totalProducts, totalValue, lowStockProducts] = await Promise.all([
      prisma.product.count(),
      prisma.product.aggregate({
        _sum: {
          mrp: true,
        },
      }),
      // Count products with low stock (based on lowStockLimit field)
      prisma.product.count({
        where: {
          lowStockLimit: {
            gt: 0,
          },
        },
      }),
    ]);

    const averagePrice =
      totalProducts > 0 ? totalValue._sum.mrp! / totalProducts : 0;

    res.json({
      stats: {
        totalProducts,
        lowStockProducts,
        totalValue: totalValue._sum.mrp || 0,
        averagePrice: Math.round(averagePrice),
      },
    });
  } catch (error) {
    console.error("Error fetching product stats:\n", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
