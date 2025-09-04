"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCustomer = exports.updateCustomer = exports.getCustomerById = exports.getCustomerStats = exports.getCustomers = exports.createCustomer = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Create a new customer (user with CUSTOMER privilege)
const createCustomer = async (req, res) => {
    try {
        const { name, aadharNumber, email, phone, address, pan, gstNumber, password, } = req.body;
        // Check if user with same email or phone already exists
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { email },
                    { phone },
                    ...(aadharNumber ? [{ aadharNumber }] : []),
                    ...(pan ? [{ pan }] : []),
                    ...(gstNumber ? [{ gstNumber }] : []),
                ],
            },
        });
        if (existingUser) {
            return res.status(409).json({
                message: "User with same email, phone, Aadhar, PAN, or GST number already exists"
            });
        }
        // Get the CUSTOMER privilege ID
        const customerPrivilege = await prisma.userPrivilege.findFirst({
            where: { name: "CUSTOMER" },
        });
        if (!customerPrivilege) {
            return res.status(500).json({ message: "Customer privilege not found" });
        }
        // Hash the password
        const bcrypt = require("bcrypt");
        const hashedPassword = await bcrypt.hash(password || "defaultPassword123", +process.env.BCRYPT_SALT_ROUNDS || 10);
        const customer = await prisma.user.create({
            data: {
                name,
                email,
                phone,
                password: hashedPassword,
                privilegeId: customerPrivilege.id,
                aadharNumber,
                pan,
                gstNumber,
                address,
            },
            include: {
                privilege: true,
            },
        });
        res.status(201).json({ customer });
    }
    catch (error) {
        console.error("Error creating customer:\n", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.createCustomer = createCustomer;
// Get all customers with pagination and search
const getCustomers = async (req, res) => {
    try {
        const { page = 1, limit = 10, search, } = req.query;
        const skip = (Number(page) - 1) * Number(limit);
        // Get the CUSTOMER privilege ID
        const customerPrivilege = await prisma.userPrivilege.findFirst({
            where: { name: "CUSTOMER" },
        });
        if (!customerPrivilege) {
            return res.status(500).json({ message: "Customer privilege not found" });
        }
        // Build where clause
        const where = {
            privilegeId: customerPrivilege.id,
        };
        if (search) {
            where.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { email: { contains: search, mode: 'insensitive' } },
                { phone: { contains: search, mode: 'insensitive' } },
            ];
        }
        const [customers, total] = await Promise.all([
            prisma.user.findMany({
                where,
                skip,
                take: Number(limit),
                include: {
                    privilege: true,
                },
                orderBy: {
                    createdAt: "desc",
                },
            }),
            prisma.user.count({ where }),
        ]);
        const totalPages = Math.ceil(total / Number(limit));
        res.json({
            customers,
            pagination: {
                currentPage: Number(page),
                totalPages,
                totalItems: total,
                itemsPerPage: Number(limit),
            },
        });
    }
    catch (error) {
        console.error("Error fetching customers:\n", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.getCustomers = getCustomers;
// Get customer statistics
const getCustomerStats = async (req, res) => {
    try {
        // Get the CUSTOMER privilege ID
        const customerPrivilege = await prisma.userPrivilege.findFirst({
            where: { name: "CUSTOMER" },
        });
        if (!customerPrivilege) {
            return res.status(500).json({ message: "Customer privilege not found" });
        }
        const [totalCustomers, customersWithOrders] = await Promise.all([
            prisma.user.count({
                where: { privilegeId: customerPrivilege.id },
            }),
            prisma.user.count({
                where: {
                    privilegeId: customerPrivilege.id,
                    Order: {
                        some: {},
                    },
                },
            }),
        ]);
        res.json({
            totalCustomers,
            customersWithOrders,
            customersWithoutOrders: totalCustomers - customersWithOrders,
        });
    }
    catch (error) {
        console.error("Error fetching customer statistics:\n", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.getCustomerStats = getCustomerStats;
// Get a single customer by ID
const getCustomerById = async (req, res) => {
    try {
        const { id } = req.params;
        const customer = await prisma.user.findUnique({
            where: { id },
            include: {
                privilege: true,
                Order: {
                    include: {
                        OrderItem: {
                            include: {
                                Product: true,
                            },
                        },
                    },
                    orderBy: {
                        orderDate: "desc",
                    },
                },
            },
        });
        if (!customer) {
            return res.status(404).json({ message: "Customer not found" });
        }
        // Check if user is actually a customer
        if (!customer.privilege || customer.privilege.name !== "CUSTOMER") {
            return res.status(400).json({ message: "User is not a customer" });
        }
        res.json({ customer });
    }
    catch (error) {
        console.error("Error fetching customer:\n", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.getCustomerById = getCustomerById;
// Update a customer
const updateCustomer = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        // Check if customer exists and is actually a customer
        const existingCustomer = await prisma.user.findUnique({
            where: { id },
            include: {
                privilege: true,
            },
        });
        if (!existingCustomer) {
            return res.status(404).json({ message: "Customer not found" });
        }
        if (!existingCustomer.privilege || existingCustomer.privilege.name !== "CUSTOMER") {
            return res.status(400).json({ message: "User is not a customer" });
        }
        // Check for conflicts with other users if updating unique fields
        if (updateData.email || updateData.phone || updateData.aadharNumber || updateData.pan || updateData.gstNumber) {
            const conflictUser = await prisma.user.findFirst({
                where: {
                    AND: [
                        { id: { not: id } },
                        {
                            OR: [
                                ...(updateData.email ? [{ email: updateData.email }] : []),
                                ...(updateData.phone ? [{ phone: updateData.phone }] : []),
                                ...(updateData.aadharNumber ? [{ aadharNumber: updateData.aadharNumber }] : []),
                                ...(updateData.pan ? [{ pan: updateData.pan }] : []),
                                ...(updateData.gstNumber ? [{ gstNumber: updateData.gstNumber }] : []),
                            ],
                        },
                    ],
                },
            });
            if (conflictUser) {
                return res.status(409).json({
                    message: "User with same email, phone, Aadhar, PAN, or GST number already exists"
                });
            }
        }
        const updatedCustomer = await prisma.user.update({
            where: { id },
            data: updateData,
            include: {
                privilege: true,
            },
        });
        res.json({ customer: updatedCustomer });
    }
    catch (error) {
        console.error("Error updating customer:\n", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.updateCustomer = updateCustomer;
// Delete a customer
const deleteCustomer = async (req, res) => {
    try {
        const { id } = req.params;
        // Check if customer exists and is actually a customer
        const customer = await prisma.user.findUnique({
            where: { id },
            include: {
                privilege: true,
                Order: true,
            },
        });
        if (!customer) {
            return res.status(404).json({ message: "Customer not found" });
        }
        if (!customer.privilege || customer.privilege.name !== "CUSTOMER") {
            return res.status(400).json({ message: "User is not a customer" });
        }
        // Check if customer has orders
        if (customer.Order.length > 0) {
            return res.status(400).json({
                message: "Cannot delete customer with existing orders. Please delete orders first."
            });
        }
        await prisma.user.delete({
            where: { id },
        });
        res.json({ message: "Customer deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting customer:\n", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.deleteCustomer = deleteCustomer;
//# sourceMappingURL=customer.controller.js.map