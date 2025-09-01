import express from "express";
import {
  // Group controllers
  createGroup,
  getGroups,
  getGroupById,
  updateGroup,
  deleteGroup,
} from "../controller/group.controller";
import {
  // Group middleware
  validateCreateGroup,
  validateUpdateGroup,
} from "../middleware/group.middleware";
import { validateAccessToken } from "../middleware/auth.middleware";

const router = express.Router();

// Protected routes - require authentication
// router.use(validateAccessToken);

// Group routes
router.post("/", validateCreateGroup, createGroup);
router.get("/", getGroups);
router.get("/:id", getGroupById);
router.put("/:id", validateUpdateGroup, updateGroup);
router.delete("/:id", deleteGroup);

export default router;
