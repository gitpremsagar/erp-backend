import express from "express";
import { 
  signup, 
  signin, 
  signout, 
  refreshAccessToken, 
  decodeAccessToken, 
  getUserProfile,
  assignPrivilege,
  forgotPassword, 
  changePassword 
} from "../controller/auth.controller";
import { 
  validateSignupForm,
  validateSigninForm,
  validateAccessToken,
  validateAssignPrivilege
} from "../middleware/auth.middleware";
const router = express.Router();

router.post("/sign-up", validateSignupForm, signup);

router.post("/sign-in", validateSigninForm, signin);

router.post("/sign-out", signout);

router.post("/decode-access-token", validateAccessToken, decodeAccessToken);

router.get("/profile", validateAccessToken, getUserProfile);

router.post("/assign-privilege", validateAccessToken, validateAssignPrivilege, assignPrivilege);

router.post("/refresh-access-token", refreshAccessToken);

router.post("/forgot-password", forgotPassword);

router.post("/change-password", changePassword);

export default router;