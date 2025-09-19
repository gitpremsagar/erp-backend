import express from "express";
import {
  createEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  getEmployeeStats,
} from "../controller/employee.controller";
import {
  validateCreateEmployee,
  validateUpdateEmployee,
  validateEmployeeQuery,
} from "../middleware/employee.middleware";
import { validateAccessToken } from "../middleware/auth.middleware";

const router = express.Router();

// Protected routes - require authentication
// router.use(validateAccessToken);

// Create a new employee
router.post("/", validateCreateEmployee, createEmployee);

// Get all employees with pagination and search
router.get("/", validateEmployeeQuery, getEmployees);

// Get employee statistics
router.get("/stats", getEmployeeStats);

// Get a single employee by ID
router.get("/:id", getEmployeeById);

// Update an employee
router.put("/:id", validateUpdateEmployee, updateEmployee);

// Delete an employee
router.delete("/:id", deleteEmployee);

export default router;
