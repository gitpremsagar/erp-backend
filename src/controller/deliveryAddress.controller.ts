import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Create a new delivery address
export const createDeliveryAddress = async (req: Request, res: Response) => {
  try {
    const { userId, address, default: isDefault } = req.body;

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // If this is set as default, unset other default addresses for this user
    if (isDefault) {
      await prisma.deliveryAddress.updateMany({
        where: { userId },
        data: { default: false },
      });
    }

    const deliveryAddress = await prisma.deliveryAddress.create({
      data: {
        userId,
        address,
        default: isDefault || false,
      },
      include: {
        User: true,
      },
    });

    res.status(201).json({ deliveryAddress });
  } catch (error) {
    console.error("Error creating delivery address:\n", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all delivery addresses for a user
export const getDeliveryAddresses = async (req: Request, res: Response) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: userId as string },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const deliveryAddresses = await prisma.deliveryAddress.findMany({
      where: { userId: userId as string },
      include: {
        User: true,
      },
      orderBy: [
        { default: "desc" },
        { createdAt: "desc" },
      ],
    });

    res.json({ deliveryAddresses });
  } catch (error) {
    console.error("Error fetching delivery addresses:\n", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get a single delivery address by ID
export const getDeliveryAddressById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deliveryAddress = await prisma.deliveryAddress.findUnique({
      where: { id },
      include: {
        User: true,
      },
    });

    if (!deliveryAddress) {
      return res.status(404).json({ message: "Delivery address not found" });
    }

    res.json({ deliveryAddress });
  } catch (error) {
    console.error("Error fetching delivery address:\n", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update a delivery address
export const updateDeliveryAddress = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { address, default: isDefault } = req.body;

    // Check if delivery address exists
    const existingDeliveryAddress = await prisma.deliveryAddress.findUnique({
      where: { id },
      include: {
        User: true,
      },
    });

    if (!existingDeliveryAddress) {
      return res.status(404).json({ message: "Delivery address not found" });
    }

    // If this is being set as default, unset other default addresses for this user
    if (isDefault) {
      await prisma.deliveryAddress.updateMany({
        where: { 
          userId: existingDeliveryAddress.userId,
          id: { not: id },
        },
        data: { default: false },
      });
    }

    const updatedDeliveryAddress = await prisma.deliveryAddress.update({
      where: { id },
      data: {
        address,
        default: isDefault,
      },
      include: {
        User: true,
      },
    });

    res.json({ deliveryAddress: updatedDeliveryAddress });
  } catch (error) {
    console.error("Error updating delivery address:\n", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a delivery address
export const deleteDeliveryAddress = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Check if delivery address exists
    const existingDeliveryAddress = await prisma.deliveryAddress.findUnique({
      where: { id },
      include: {
        Order: true,
      },
    });

    if (!existingDeliveryAddress) {
      return res.status(404).json({ message: "Delivery address not found" });
    }

    // Check if delivery address is being used by any orders
    if (existingDeliveryAddress.Order.length > 0) {
      return res.status(400).json({ 
        message: "Cannot delete delivery address that is being used by orders" 
      });
    }

    await prisma.deliveryAddress.delete({
      where: { id },
    });

    res.json({ message: "Delivery address deleted successfully" });
  } catch (error) {
    console.error("Error deleting delivery address:\n", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Set a delivery address as default
export const setDefaultDeliveryAddress = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Check if delivery address exists
    const existingDeliveryAddress = await prisma.deliveryAddress.findUnique({
      where: { id },
    });

    if (!existingDeliveryAddress) {
      return res.status(404).json({ message: "Delivery address not found" });
    }

    // Unset other default addresses for this user
    await prisma.deliveryAddress.updateMany({
      where: { 
        userId: existingDeliveryAddress.userId,
        id: { not: id },
      },
      data: { default: false },
    });

    // Set this address as default
    const updatedDeliveryAddress = await prisma.deliveryAddress.update({
      where: { id },
      data: { default: true },
      include: {
        User: true,
      },
    });

    res.json({ deliveryAddress: updatedDeliveryAddress });
  } catch (error) {
    console.error("Error setting default delivery address:\n", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
