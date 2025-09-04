"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteVehicle = exports.updateVehicle = exports.getVehicleById = exports.getVehicles = exports.createVehicle = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Vehicle Controllers
const createVehicle = async (req, res) => {
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
    }
    catch (error) {
        console.error("Error creating vehicle:\n", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.createVehicle = createVehicle;
const getVehicles = async (req, res) => {
    try {
        const vehicles = await prisma.vehicle.findMany({
            orderBy: { vehicleName: "asc" },
        });
        res.json({ vehicles });
    }
    catch (error) {
        console.error("Error fetching vehicles:\n", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.getVehicles = getVehicles;
const getVehicleById = async (req, res) => {
    try {
        const { id } = req.params;
        const vehicle = await prisma.vehicle.findUnique({
            where: { id },
        });
        if (!vehicle) {
            return res.status(404).json({ message: "Vehicle not found" });
        }
        res.json({ vehicle });
    }
    catch (error) {
        console.error("Error fetching vehicle:\n", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.getVehicleById = getVehicleById;
const updateVehicle = async (req, res) => {
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
    }
    catch (error) {
        console.error("Error updating vehicle:\n", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.updateVehicle = updateVehicle;
const deleteVehicle = async (req, res) => {
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
    }
    catch (error) {
        console.error("Error deleting vehicle:\n", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.deleteVehicle = deleteVehicle;
//# sourceMappingURL=vehicle.controller.js.map