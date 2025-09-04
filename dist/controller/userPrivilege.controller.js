"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserPrivilege = exports.updateUserPrivilege = exports.getUserPrivilegeById = exports.getAllUserPrivileges = exports.createUserPrivilege = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createUserPrivilege = async (req, res) => {
    try {
        const { name, description } = req.body;
        // Check if privilege with same name already exists
        const existingPrivilege = await prisma.userPrivilege.findFirst({
            where: { name },
        });
        if (existingPrivilege) {
            return res.status(409).json({ message: "Privilege with this name already exists" });
        }
        const privilege = await prisma.userPrivilege.create({
            data: {
                name,
                description,
            },
        });
        res.status(201).json({
            message: "User privilege created successfully",
            privilege,
        });
    }
    catch (error) {
        console.error("Error creating user privilege:\n", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.createUserPrivilege = createUserPrivilege;
const getAllUserPrivileges = async (req, res) => {
    try {
        const privileges = await prisma.userPrivilege.findMany({
            orderBy: { createdAt: "desc" },
        });
        res.json({ privileges });
    }
    catch (error) {
        console.error("Error fetching user privileges:\n", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.getAllUserPrivileges = getAllUserPrivileges;
const getUserPrivilegeById = async (req, res) => {
    try {
        const { id } = req.params;
        const privilege = await prisma.userPrivilege.findUnique({
            where: { id },
        });
        if (!privilege) {
            return res.status(404).json({ message: "User privilege not found" });
        }
        res.json({ privilege });
    }
    catch (error) {
        console.error("Error fetching user privilege:\n", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.getUserPrivilegeById = getUserPrivilegeById;
const updateUserPrivilege = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;
        // Check if privilege exists
        const existingPrivilege = await prisma.userPrivilege.findUnique({
            where: { id },
        });
        if (!existingPrivilege) {
            return res.status(404).json({ message: "User privilege not found" });
        }
        // If name is being updated, check for duplicates
        if (name && name !== existingPrivilege.name) {
            const duplicatePrivilege = await prisma.userPrivilege.findFirst({
                where: { name },
            });
            if (duplicatePrivilege) {
                return res.status(409).json({ message: "Privilege with this name already exists" });
            }
        }
        const updatedPrivilege = await prisma.userPrivilege.update({
            where: { id },
            data: {
                name,
                description,
            },
        });
        res.json({
            message: "User privilege updated successfully",
            privilege: updatedPrivilege,
        });
    }
    catch (error) {
        console.error("Error updating user privilege:\n", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.updateUserPrivilege = updateUserPrivilege;
const deleteUserPrivilege = async (req, res) => {
    try {
        const { id } = req.params;
        // Check if privilege exists
        const existingPrivilege = await prisma.userPrivilege.findUnique({
            where: { id },
        });
        if (!existingPrivilege) {
            return res.status(404).json({ message: "User privilege not found" });
        }
        // Check if privilege is being used by any users
        const usersWithPrivilege = await prisma.user.findMany({
            where: { privilegeId: id },
        });
        if (usersWithPrivilege.length > 0) {
            return res.status(400).json({
                message: "Cannot delete privilege that is assigned to users",
                userCount: usersWithPrivilege.length
            });
        }
        await prisma.userPrivilege.delete({
            where: { id },
        });
        res.json({ message: "User privilege deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting user privilege:\n", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.deleteUserPrivilege = deleteUserPrivilege;
//# sourceMappingURL=userPrivilege.controller.js.map