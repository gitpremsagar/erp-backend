import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Create a new customer (user with CUSTOMER privilege)
export const createCustomer = async (req: Request, res: Response) => {
  try {
    const {
      name,
      aadharNumber,
      email,
      phone,
      address,
      pan,
      gstNumber,
      password,
    } = req.body;

    console.log(req.body);

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

    // Hash the password
    const bcrypt = require("bcrypt");
    const hashedPassword = await bcrypt.hash(
      password || "defaultPassword123",
      +process.env.BCRYPT_SALT_ROUNDS! || 10
    );

    const customer = await prisma.user.create({
      data: {
        name,
        email,
        phone,
        password: hashedPassword,
        userType: "CUSTOMER",
        aadharNumber,
        pan,
        gstNumber,
        address,
      },
    });

    res.status(201).json({ customer });
  } catch (error) {
    console.error("Error creating customer:\n", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all customers with pagination and search
export const getCustomers = async (req: Request, res: Response) => {
  console.log(req.query);
  try {
    const {
      page = 1,
      limit = 10,
      search,
    } = req.query;

    const skip = (Number(page) - 1) * Number(limit);

    // Build where clause
    const where: any = {
      userType: "CUSTOMER",
    };
    
    if (search) {
      where.OR = [
        { name: { contains: search as string, mode: 'insensitive' } },
        { email: { contains: search as string, mode: 'insensitive' } },
        { phone: { contains: search as string, mode: 'insensitive' } },
      ];
    }

    const [customers, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take: Number(limit),
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
  } catch (error) {
    console.error("Error fetching customers:\n", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get customer statistics
export const getCustomerStats = async (req: Request, res: Response) => {
  try {
    const [totalCustomers, customersWithOrders] = await Promise.all([
      prisma.user.count({
        where: { userType: "CUSTOMER" },
      }),
      prisma.user.count({
        where: {
          userType: "CUSTOMER",
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
  } catch (error) {
    console.error("Error fetching customer statistics:\n", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get a single customer by ID
export const getCustomerById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const customer = await prisma.user.findUnique({
      where: { id },
      include: {
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
    if (customer.userType !== "CUSTOMER") {
      return res.status(400).json({ message: "User is not a customer" });
    }

    res.json({ customer });
  } catch (error) {
    console.error("Error fetching customer:\n", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update a customer
export const updateCustomer = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Check if customer exists and is actually a customer
    const existingCustomer = await prisma.user.findUnique({
      where: { id },
    });

    if (!existingCustomer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    if (existingCustomer.userType !== "CUSTOMER") {
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
    });

    res.json({ customer: updatedCustomer });
  } catch (error) {
    console.error("Error updating customer:\n", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a customer
export const deleteCustomer = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Check if customer exists and is actually a customer
    const customer = await prisma.user.findUnique({
      where: { id },
      include: {
        Order: true,
      },
    });

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    if (customer.userType !== "CUSTOMER") {
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
  } catch (error) {
    console.error("Error deleting customer:\n", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
