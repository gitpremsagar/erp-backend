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
      description,
      lowStockLimit,
      overStockLimit,
      categoryId,
      subCategoryId,
      grammage,
      imageUrl,
      tags,
      // Stock related fields
      stockId,
      manufacturingDate,
      arrivalDate,
      validityMonths,
      supplierName,
      supplierId,
      stockQuantity,
    } = req.body;

    // Get user ID from request (assuming it's set by auth middleware)
    const userId = (req as any).user?.id;
    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    // Check if product code already exists
    const existingProduct = await prisma.product.findUnique({
      where: { productCode },
    });

    if (existingProduct) {
      return res.status(409).json({ message: "Product code already exists" });
    }

    // Verify that category and subcategory exist
    const [category, subCategory] = await Promise.all([
      prisma.category.findUnique({ where: { id: categoryId } }),
      prisma.subCategory.findUnique({ where: { id: subCategoryId } }),
    ]);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    if (!subCategory) {
      return res.status(404).json({ message: "Sub-category not found" });
    }

    // Create product, stock, and tag relations in a transaction
    const result = await prisma.$transaction(async (tx) => {
      // Create the product
      const product = await tx.product.create({
        data: {
          name,
          mrp,
          productCode,
          description,
          lowStockLimit: lowStockLimit || 0,
          overStockLimit: overStockLimit || 0,
          categoryId,
          subCategoryId,
          grammage,
          imageUrl,
        },
        include: {
          Category: true,
          SubCategory: true,
        },
      });

      // Create stock entry if stock data is provided
      let stock = null;
      if (stockId && stockQuantity !== undefined) {
        const expiryDate = new Date(manufacturingDate);
        expiryDate.setMonth(expiryDate.getMonth() + (validityMonths || 10));

        stock = await tx.stock.create({
          data: {
            stockId,
            productId: product.id,
            manufacturingDate: new Date(manufacturingDate),
            arrivalDate: new Date(arrivalDate),
            validityMonths: validityMonths || 1,
            expiryDate,
            supplierName,
            supplierId,
            stockQuantity,
          },
        });

        // Create stock record for the initial stock entry
        await tx.stockRecord.create({
          data: {
            productId: product.id,
            changeInStock: stockQuantity,
            createdBy: userId,
            stockId: stock.stockId,
            reason: "ARRIVAL_FROM_SUPPLIER",
          },
        });
      }

      // Create product tag relations if tags are provided
      const tagRelations = [];
      if (tags && tags.length > 0) {
        for (const tagName of tags) {
          // Find or create the tag
          let tag = await tx.productTag.findFirst({
            where: { name: tagName },
          });

          if (!tag) {
            tag = await tx.productTag.create({
              data: { name: tagName },
            });
          }

          // Create the relation
          const relation = await tx.productTagRelation.create({
            data: {
              productId: product.id,
              productTagId: tag.id,
            },
          });

          tagRelations.push(relation);
        }
      }

      return { product, stock, tagRelations };
    });

    res.status(201).json({
      product: result.product,
      stock: result.stock,
      tagRelations: result.tagRelations,
    });
  } catch (error) {
    console.error("Error creating product:\n", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all products with pagination and filtering
export const getProducts = async (req: Request, res: Response) => {
  console.log("getProducts");
  try {
    const {
      page = 1,
      limit = 10,
      search,
      categoryId,
      subCategoryId,
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
        { description: { contains: search, mode: "insensitive" } },
      ];
    }

    if (categoryId) {
      where.categoryId = categoryId;
    }

    if (subCategoryId) {
      where.subCategoryId = subCategoryId;
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
          SubCategory: {
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
          Stock: {
            select: {
              id: true,
              stockId: true,
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
          SubCategory: true,
          ProductTagRelation: {
            include: {
              ProductTag: true,
            },
          },
          Stock: true,
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

    // Verify that category and subcategory exist if they're being updated
    if (updateData.categoryId) {
      const category = await prisma.category.findUnique({
        where: { id: updateData.categoryId },
      });
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
    }

    if (updateData.subCategoryId) {
      const subCategory = await prisma.subCategory.findUnique({
        where: { id: updateData.subCategoryId },
      });
      if (!subCategory) {
        return res.status(404).json({ message: "Sub-category not found" });
      }
    }

    // Handle tag updates if provided
    let tagRelations = [];
    if (updateData.tags) {
      // Remove existing tag relations
      await prisma.productTagRelation.deleteMany({
        where: { productId: id },
      });

      // Create new tag relations
      for (const tagName of updateData.tags) {
        // Find or create the tag
        let tag = await prisma.productTag.findFirst({
          where: { name: tagName },
        });

        if (!tag) {
          tag = await prisma.productTag.create({
            data: { name: tagName },
          });
        }

        // Create the relation
        const relation = await prisma.productTagRelation.create({
          data: {
            productId: id,
            productTagId: tag.id,
          },
        });

        tagRelations.push(relation);
      }

      // Remove tags from updateData as it's handled separately
      delete updateData.tags;
    }

    const product = await prisma.product.update({
      where: { id },
      data: updateData,
      include: {
        Category: true,
        SubCategory: true,
        ProductTagRelation: {
          include: {
            ProductTag: true,
          },
        },
        Stock: true,
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
      return res.status(400).json({
        message:
          "Cannot delete product as it is associated with existing orders",
      });
    }

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
      // Count products with low stock (stock quantity <= lowStockLimit)
      prisma.product.count({
        where: {
          Stock: {
            some: {
              stockQuantity: {
                lte: 10, // Default low stock threshold
              },
            },
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
