import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// SubCategory Controllers
export const createSubCategory = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;

    // Check if subcategory name already exists
    const existingSubCategory = await prisma.subCategory.findUnique({
      where: { name },
    });

    if (existingSubCategory) {
      return res.status(409).json({ message: "Sub-category name already exists" });
    }

    const subCategory = await prisma.subCategory.create({
      data: { name, description },
    });

    res.status(201).json({ subCategory });
  } catch (error) {
    console.error("Error creating sub-category:\n", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getSubCategories = async (req: Request, res: Response) => {
  try {
    const subCategories = await prisma.subCategory.findMany({
      orderBy: { name: "asc" },
    });

    res.json({ subCategories });
  } catch (error) {
    console.error("Error fetching sub-categories:\n", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getSubCategoryById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const subCategory = await prisma.subCategory.findUnique({
      where: { id },
      include: {
        Product: true,
      },
    });

    if (!subCategory) {
      return res.status(404).json({ message: "Sub-category not found" });
    }

    res.json({ subCategory });
  } catch (error) {
    console.error("Error fetching sub-category:\n", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateSubCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

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

    const subCategory = await prisma.subCategory.update({
      where: { id },
      data: { name, description },
    });

    res.json({ subCategory });
  } catch (error) {
    console.error("Error updating sub-category:\n", error);
    res.status(500).json({ message: "Internal server error" });
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

    res.json({ message: "Sub-category deleted successfully" });
  } catch (error) {
    console.error("Error deleting sub-category:\n", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
