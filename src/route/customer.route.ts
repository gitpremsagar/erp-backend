import express from "express";
import {
  createCustomer,
  getCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
  getCustomerStats,
} from "../controller/customer.controller";
import {
  validateCreateCustomer,
  validateUpdateCustomer,
  validateCustomerQuery,
} from "../middleware/customer.middleware";
import { validateAccessToken } from "../middleware/auth.middleware";

const router = express.Router();

// Protected routes - require authentication
// router.use(validateAccessToken);

// Create a new customer
router.post("/", validateCreateCustomer, createCustomer);

// Get all customers with pagination and search
router.get("/", validateCustomerQuery, getCustomers);

// Get customer statistics
router.get("/stats", getCustomerStats);

// Get a single customer by ID
router.get("/:id", getCustomerById);

// Update a customer
router.put("/:id", validateUpdateCustomer, updateCustomer);

// Delete a customer
router.delete("/:id", deleteCustomer);

export default router;
