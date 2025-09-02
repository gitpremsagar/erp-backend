import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Vehicle Controllers
export const createVehicle = async (req: Request, res: Response) => {
  try {
    const { vehicleName, vehicleNumber, vehicleType, capacity } = req.body;

    // Check if vehicle number already exists
    const existingVehicle = await prisma.vehicle.findUnique({
      where: { vehicleNumber },
    });

    if (existingVehicle) {
      return res.status(409).json({ message: "Vehicle number already exists" });
    }

    const vehicle = await prisma.vehicle.create({
      data: { vehicleName, vehicleNumber, vehicleType, capacity },
    });

    res.status(201).json({ vehicle });
  } catch (error) {
    console.error("Error creating vehicle:\n", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getVehicles = async (req: Request, res: Response) => {
  try {
    const vehicles = await prisma.vehicle.findMany({
      orderBy: { vehicleName: "asc" },
    });

    res.json({ vehicles });
  } catch (error) {
    console.error("Error fetching vehicles:\n", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getVehicleById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const vehicle = await prisma.vehicle.findUnique({
      where: { id },
    });

    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    res.json({ vehicle });
  } catch (error) {
    console.error("Error fetching vehicle:\n", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateVehicle = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { vehicleName, vehicleNumber, vehicleType, capacity } = req.body;

    // Check if vehicle exists
    const existingVehicle = await prisma.vehicle.findUnique({
      where: { id },
    });

    if (!existingVehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    // If vehicle number is being updated, check for uniqueness
    if (vehicleNumber && vehicleNumber !== existingVehicle.vehicleNumber) {
      const duplicateVehicle = await prisma.vehicle.findUnique({
        where: { vehicleNumber },
      });

      if (duplicateVehicle) {
        return res.status(409).json({ message: "Vehicle number already exists" });
      }
    }

    const vehicle = await prisma.vehicle.update({
      where: { id },
      data: { vehicleName, vehicleNumber, vehicleType, capacity },
    });

    res.json({ vehicle });
  } catch (error) {
    console.error("Error updating vehicle:\n", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteVehicle = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Check if vehicle exists
    const existingVehicle = await prisma.vehicle.findUnique({
      where: { id },
    });

    if (!existingVehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    await prisma.vehicle.delete({
      where: { id },
    });

    res.json({ message: "Vehicle deleted successfully" });
  } catch (error) {
    console.error("Error deleting vehicle:\n", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
