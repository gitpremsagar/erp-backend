import express from "express";
import {
  // Vehicle controllers
  createVehicle,
  getVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
} from "../controller/vehicle.controller";
import {
  // Vehicle middleware
  validateCreateVehicle,
  validateUpdateVehicle,
} from "../middleware/vehicle.middleware";
import { validateAccessToken } from "../middleware/auth.middleware";

const router = express.Router();

// Protected routes - require authentication
// router.use(validateAccessToken);

// Vehicle routes
router.post("/", validateCreateVehicle, createVehicle);
router.get("/", getVehicles);
router.get("/:id", getVehicleById);
router.put("/:id", validateUpdateVehicle, updateVehicle);
router.delete("/:id", deleteVehicle);

export default router;
