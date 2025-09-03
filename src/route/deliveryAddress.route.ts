import express from "express";
import {
  createDeliveryAddress,
  getDeliveryAddresses,
  getDeliveryAddressById,
  updateDeliveryAddress,
  deleteDeliveryAddress,
  setDefaultDeliveryAddress,
} from "../controller/deliveryAddress.controller";
import { validateAccessToken } from "../middleware/auth.middleware";

const router = express.Router();

// Protected routes - require authentication
// router.use(validateAccessToken);

// Create a new delivery address
router.post("/", createDeliveryAddress);

// Get all delivery addresses for a user
router.get("/", getDeliveryAddresses);

// Get a single delivery address by ID
router.get("/:id", getDeliveryAddressById);

// Update a delivery address
router.put("/:id", updateDeliveryAddress);

// Delete a delivery address
router.delete("/:id", deleteDeliveryAddress);

// Set a delivery address as default
router.patch("/:id/default", setDefaultDeliveryAddress);

export default router;
