import express from "express";
import {
  createUserPrivilege,
  getAllUserPrivileges,
  getUserPrivilegeById,
  updateUserPrivilege,
  deleteUserPrivilege,
} from "../controller/userPrivilege.controller";

const router = express.Router();

// Create a new user privilege
router.post("/", createUserPrivilege);

// Get all user privileges
router.get("/", getAllUserPrivileges);

// Get user privilege by ID
router.get("/:id", getUserPrivilegeById);

// Update user privilege
router.put("/:id", updateUserPrivilege);

// Delete user privilege
router.delete("/:id", deleteUserPrivilege);

export default router;
