import { z } from "zod";

// Category Schema
export const CreateCategorySchema = z.object({
  name: z
    .string()
    .min(1, "Category name is required")
    .max(100, "Category name must be at most 100 characters long")
    .trim(),
  description: z
    .string()
    .min(1, "Description is required")
    .max(500, "Description must be at most 500 characters long")
    .trim(),
});

export const UpdateCategorySchema = CreateCategorySchema.partial();

// Group Schema
export const CreateGroupSchema = z.object({
  name: z
    .string()
    .min(1, "Group name is required")
    .max(100, "Group name must be at most 100 characters long")
    .trim(),
  description: z
    .string()
    .min(1, "Description is required")
    .max(500, "Description must be at most 500 characters long")
    .trim(),
});

export const UpdateGroupSchema = CreateGroupSchema.partial();

// SubCategory Schema
export const CreateSubCategorySchema = z.object({
  name: z
    .string()
    .min(1, "Sub-category name is required")
    .max(100, "Sub-category name must be at most 100 characters long")
    .trim(),
  description: z
    .string()
    .min(1, "Description is required")
    .max(500, "Description must be at most 500 characters long")
    .trim(),
  categoryId: z
    .string()
    .min(1, "Category ID is required")
    .trim(),
});

export const UpdateSubCategorySchema = CreateSubCategorySchema.partial();
