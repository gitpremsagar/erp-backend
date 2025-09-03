import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// SubCategory Controllers
export const createSubCategory = async (req: Request, res: Response) => {
  try {
    const { name, description, categoryId } = req.body;

    // Check if subcategory name already exists
    const existingSubCategory = await prisma.subCategory.findUnique({
      where: { name },
    });

    if (existingSubCategory) {
      return res.status(409).json({ message: "Sub-category name already exists" });
    }

    // Check if category exists
    const category = await prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    const subCategory = await prisma.subCategory.create({
      data: { 
        name, 
        description, 
        Category: {
          connect: { id: categoryId }
        }
      }
    });

    // Fetch the created subcategory with category details
    const subCategoryWithCategory = await prisma.subCategory.findUnique({
      where: { id: subCategory.id },
      include: {
        Category: true
      }
    });

    return res.status(201).json({ subCategory: subCategoryWithCategory });
    
  } catch (error) {
    console.error("Error creating sub-category:\n", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getSubCategories = async (req: Request, res: Response) => {
  try {
    const subCategories = await prisma.subCategory.findMany({
      orderBy: { name: "asc" },
      include: {
        Category: true
      }
    });

    return res.json({ subCategories });
  } catch (error) {
    console.error("Error fetching sub-categories:\n", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getSubCategoryById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const subCategory = await prisma.subCategory.findUnique({
      where: { id },
      include: {
        Product: true,
        Category: true,
      },
    });

    if (!subCategory) {
      return res.status(404).json({ message: "Sub-category not found" });
    }

    return res.json({ subCategory });
  } catch (error) {
    console.error("Error fetching sub-category:\n", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateSubCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, categoryId } = req.body;

    // Check if subcategory exists
    const existingSubCategory = await prisma.subCategory.findUnique({
      where: { id },
    });

    if (!existingSubCategory) {
      return res.status(404).json({ message: "Sub-category not found" });
    }

    // If name is being updated, check for uniqueness
    if (name && name !== existingSubCategory.name) {
      const duplicateSubCategory = await prisma.subCategory.findUnique({
        where: { name },
      });

      if (duplicateSubCategory) {
        return res.status(409).json({ message: "Sub-category name already exists" });
      }
    }

    // If categoryId is being updated, check if category exists
    if (categoryId) {
      const category = await prisma.category.findUnique({
        where: { id: categoryId },
      });

      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
    }

    const updateData: any = {};
    if (name) updateData.name = name;
    if (description) updateData.description = description;
    if (categoryId) {
      updateData.Category = {
        connect: { id: categoryId }
      };
    }

    const subCategory = await prisma.subCategory.update({
      where: { id },
      data: updateData,
      include: {
        Category: true
      }
    });

    return res.json({ subCategory });
  } catch (error) {
    console.error("Error updating sub-category:\n", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getSubCategoriesByCategory = async (req: Request, res: Response) => {
  try {
    const { categoryId } = req.params;

    // Check if category exists
    const category = await prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    const subCategories = await prisma.subCategory.findMany({
      where: { categoryId },
      orderBy: { name: "asc" },
      include: {
        Category: true
      }
    });

    return res.json({ subCategories });
  } catch (error) {
    console.error("Error fetching sub-categories by category:\n", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteSubCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Check if subcategory exists
    const existingSubCategory = await prisma.subCategory.findUnique({
      where: { id },
    });

    if (!existingSubCategory) {
      return res.status(404).json({ message: "Sub-category not found" });
    }

    // Check if subcategory is used by any products
    const products = await prisma.product.findMany({
      where: { subCategoryId: id },
    });

    if (products.length > 0) {
      return res.status(400).json({
        message: "Cannot delete sub-category as it is associated with existing products",
      });
    }

    await prisma.subCategory.delete({
      where: { id },
    });

    return res.json({ message: "Sub-category deleted successfully" });
  } catch (error) {
    console.error("Error deleting sub-category:\n", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
