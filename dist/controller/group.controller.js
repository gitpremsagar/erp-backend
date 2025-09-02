"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteGroup = exports.updateGroup = exports.getGroupById = exports.getGroups = exports.createGroup = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Group Controllers
const createGroup = async (req, res) => {
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
    }
    catch (error) {
        console.error("Error creating group:\n", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.createGroup = createGroup;
const getGroups = async (req, res) => {
    try {
        const groups = await prisma.group.findMany({
            orderBy: { name: "asc" },
        });
        res.json({ groups });
    }
    catch (error) {
        console.error("Error fetching groups:\n", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.getGroups = getGroups;
const getGroupById = async (req, res) => {
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
    }
    catch (error) {
        console.error("Error fetching group:\n", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.getGroupById = getGroupById;
const updateGroup = async (req, res) => {
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
    }
    catch (error) {
        console.error("Error updating group:\n", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.updateGroup = updateGroup;
const deleteGroup = async (req, res) => {
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
    }
    catch (error) {
        console.error("Error deleting group:\n", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.deleteGroup = deleteGroup;
//# sourceMappingURL=group.controller.js.map