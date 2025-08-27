import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Category Controllers
export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;

    // Check if category name already exists
    const existingCategory = await prisma.category.findUnique({
      where: { name },
    });

    if (existingCategory) {
      return res.status(409).json({ message: "Category name already exists" });
    }

    const category = await prisma.category.create({
      data: { name, description },
    });

    res.status(201).json({ category });
  } catch (error) {
    console.error("Error creating category:\n", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: "asc" },
    });

    res.json({ categories });
  } catch (error) {
    console.error("Error fetching categories:\n", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const category = await prisma.category.findUnique({
      where: { id },
      include: {
        Product: true,
      },
    });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json({ category });
  } catch (error) {
    console.error("Error fetching category:\n", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    // Check if category exists
    const existingCategory = await prisma.category.findUnique({
      where: { id },
    });

    if (!existingCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    // If name is being updated, check for uniqueness
    if (name && name !== existingCategory.name) {
      const duplicateCategory = await prisma.category.findUnique({
        where: { name },
      });

      if (duplicateCategory) {
        return res.status(409).json({ message: "Category name already exists" });
      }
    }

    const category = await prisma.category.update({
      where: { id },
      data: { name, description },
    });

    res.json({ category });
  } catch (error) {
    console.error("Error updating category:\n", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Check if category exists
    const existingCategory = await prisma.category.findUnique({
      where: { id },
    });

    if (!existingCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Check if category is used by any products
    const products = await prisma.product.findMany({
      where: { categoryId: id },
    });

    if (products.length > 0) {
      return res.status(400).json({
        message: "Cannot delete category as it is associated with existing products",
      });
    }

    await prisma.category.delete({
      where: { id },
    });

    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error deleting category:\n", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Group Controllers
export const createGroup = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;

    // Check if group name already exists
    const existingGroup = await prisma.group.findUnique({
      where: { name },
    });

    if (existingGroup) {
      return res.status(409).json({ message: "Group name already exists" });
    }

    const group = await prisma.group.create({
      data: { name, description },
    });

    res.status(201).json({ group });
  } catch (error) {
    console.error("Error creating group:\n", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getGroups = async (req: Request, res: Response) => {
  try {
    const groups = await prisma.group.findMany({
      orderBy: { name: "asc" },
    });

    res.json({ groups });
  } catch (error) {
    console.error("Error fetching groups:\n", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getGroupById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const group = await prisma.group.findUnique({
      where: { id },
      include: {
        Product: true,
      },
    });

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    res.json({ group });
  } catch (error) {
    console.error("Error fetching group:\n", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateGroup = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    // Check if group exists
    const existingGroup = await prisma.group.findUnique({
      where: { id },
    });

    if (!existingGroup) {
      return res.status(404).json({ message: "Group not found" });
    }

    // If name is being updated, check for uniqueness
    if (name && name !== existingGroup.name) {
      const duplicateGroup = await prisma.group.findUnique({
        where: { name },
      });

      if (duplicateGroup) {
        return res.status(409).json({ message: "Group name already exists" });
      }
    }

    const group = await prisma.group.update({
      where: { id },
      data: { name, description },
    });

    res.json({ group });
  } catch (error) {
    console.error("Error updating group:\n", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteGroup = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Check if group exists
    const existingGroup = await prisma.group.findUnique({
      where: { id },
    });

    if (!existingGroup) {
      return res.status(404).json({ message: "Group not found" });
    }

    // Check if group is used by any products
    const products = await prisma.product.findMany({
      where: { groupId: id },
    });

    if (products.length > 0) {
      return res.status(400).json({
        message: "Cannot delete group as it is associated with existing products",
      });
    }

    await prisma.group.delete({
      where: { id },
    });

    res.json({ message: "Group deleted successfully" });
  } catch (error) {
    console.error("Error deleting group:\n", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

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
