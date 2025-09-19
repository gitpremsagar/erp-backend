import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Create a new employee (user with EMPLOYEE privilege)
export const createEmployee = async (req: Request, res: Response) => {
  try {
    const {
      name,
      aadharNumber,
      email,
      phone,
      address,
      pan,
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
        ],
      },
    });

    if (existingUser) {
      return res.status(409).json({ 
        message: "User with same email, phone, Aadhar, or PAN already exists" 
      });
    }

    // Hash the password
    const bcrypt = require("bcrypt");
    const hashedPassword = await bcrypt.hash(
      password || "defaultPassword123",
      +process.env.BCRYPT_SALT_ROUNDS! || 10
    );

    const employee = await prisma.user.create({
      data: {
        name,
        email,
        phone,
        password: hashedPassword,
        userType: "EMPLOYEE",
        aadharNumber,
        pan,
        address,
      },
    });

    res.status(201).json({ employee });
  } catch (error) {
    console.error("Error creating employee:\n", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all employees with pagination and search
export const getEmployees = async (req: Request, res: Response) => {
  console.log(req.query);
  try {
    const {
      page = 1,
      limit = 1000,
      search,
    } = req.query;

    const skip = (Number(page) - 1) * Number(limit);

    // Build where clause
    const where: any = {
      userType: "EMPLOYEE",
    };
    
    if (search) {
      where.OR = [
        { name: { contains: search as string, mode: 'insensitive' } },
        { email: { contains: search as string, mode: 'insensitive' } },
        { phone: { contains: search as string, mode: 'insensitive' } },
      ];
    }

    const [employees, total] = await Promise.all([
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
      employees,
      pagination: {
        currentPage: Number(page),
        totalPages,
        totalItems: total,
        itemsPerPage: Number(limit),
      },
    });
  } catch (error) {
    console.error("Error fetching employees:\n", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get employee statistics
export const getEmployeeStats = async (req: Request, res: Response) => {
  try {
    const [totalEmployees, employeesWithStockRecords] = await Promise.all([
      prisma.user.count({
        where: { userType: "EMPLOYEE" },
      }),
      prisma.user.count({
        where: {
          userType: "EMPLOYEE",
          StockRecord: {
            some: {},
          },
        },
      }),
    ]);

    res.json({
      totalEmployees,
      employeesWithStockRecords,
      employeesWithoutStockRecords: totalEmployees - employeesWithStockRecords,
    });
  } catch (error) {
    console.error("Error fetching employee statistics:\n", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get a single employee by ID
export const getEmployeeById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const employee = await prisma.user.findUnique({
      where: { id },
      include: {
        StockRecord: {
          include: {
            Product: true,
            StockBatch: true,
            Order: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // Check if user is actually an employee
    if (employee.userType !== "EMPLOYEE") {
      return res.status(400).json({ message: "User is not an employee" });
    }

    res.json({ employee });
  } catch (error) {
    console.error("Error fetching employee:\n", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update an employee
export const updateEmployee = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Check if employee exists and is actually an employee
    const existingEmployee = await prisma.user.findUnique({
      where: { id },
    });

    if (!existingEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    if (existingEmployee.userType !== "EMPLOYEE") {
      return res.status(400).json({ message: "User is not an employee" });
    }

    // Check for conflicts with other users if updating unique fields
    if (updateData.email || updateData.phone || updateData.aadharNumber || updateData.pan) {
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
              ],
            },
          ],
        },
      });

      if (conflictUser) {
        return res.status(409).json({ 
          message: "User with same email, phone, Aadhar, or PAN already exists" 
        });
      }
    }

    const updatedEmployee = await prisma.user.update({
      where: { id },
      data: updateData,
    });

    res.json({ employee: updatedEmployee });
  } catch (error) {
    console.error("Error updating employee:\n", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete an employee
export const deleteEmployee = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Check if employee exists and is actually an employee
    const employee = await prisma.user.findUnique({
      where: { id },
      include: {
        StockRecord: true,
      },
    });

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    if (employee.userType !== "EMPLOYEE") {
      return res.status(400).json({ message: "User is not an employee" });
    }

    // Check if employee has stock records
    if (employee.StockRecord.length > 0) {
      return res.status(400).json({ 
        message: "Cannot delete employee with existing stock records. Please reassign stock records first." 
      });
    }

    await prisma.user.delete({
      where: { id },
    });

    res.json({ message: "Employee deleted successfully" });
  } catch (error) {
    console.error("Error deleting employee:\n", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
