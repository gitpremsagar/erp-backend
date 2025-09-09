import dotenv from "dotenv";
dotenv.config();

import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AuthenticatedRequest } from "../middleware/auth.middleware";

const prisma = new PrismaClient();

export const signup = async (req: Request, res: Response) => {
  const {
    email,
    password,
    name,
    phone,
    aadharNumber,
    pan,
    gstNumber,
    address,
    userType
  } = req.body;

  //check if user already exists
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return res.status(409).json({ message: "User already exists" });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(
    password,
    +process.env.BCRYPT_SALT_ROUNDS!
  );

  try {
    // Create the user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        phone,
        privilegeId: null,
        aadharNumber: aadharNumber || null,
        pan: pan || null,
        gstNumber: gstNumber || null,
        address: address || null,
        userType: userType || "CUSTOMER",
      }
    });

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    // Send response
    res.status(201).json({
      message: "User created successfully",
      user: userWithoutPassword
    });
    return;
  } catch (error) {
    console.error("Error creating user:\n", error);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
};

export const signin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (!user) {
    return res.status(404).json({ message: "Invalid email or password" });
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  // Remove password from user data
  const { password: _, ...userWithoutPassword } = user;

  const userData = {
    id: userWithoutPassword.id,
    email: userWithoutPassword.email,
    name: userWithoutPassword.name,
    userType: userWithoutPassword.userType,
  };

  // Generate JWT tokens
  const accessToken = jwt.sign(
    { ...userData },
    process.env.ACCESS_TOKEN_JWT_SECRET!,
    { expiresIn: +process.env.ACCESS_TOKEN_JWT_EXPIRY! }
  );
  const refreshToken = jwt.sign(
    { userId: user.id },
    process.env.REFRESH_TOKEN_JWT_SECRET!,
    { expiresIn: +process.env.REFRESH_TOKEN_JWT_EXPIRY! }
  );

  // send refresh token to client
  res
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24 * 7,
      sameSite: "none",
      path: "/",
    })
    .cookie("accessToken", accessToken, {
      maxAge: +process.env.ACCESS_TOKEN_COOKIE_EXPIRY!,
      path: "/",
    })
    .json({ accessToken, user: userData });
  return;
};

export const signout = async (req: Request, res: Response) => {
  // remove refresh token cookie
  res
    .status(204)
    .cookie("refreshToken", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 0,
      sameSite: "none",
      path: "/",
    })
    .cookie("accessToken", "", {
      maxAge: 0,
      path: "/",
    })
    .send();
  return;
};

export const refreshAccessToken = async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    console.log("Refreshing access token failed: Refresh token is missing");
    return res.status(401).json({ message: "Refresh token is missing" });
  }

  try {
    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_JWT_SECRET!
    ) as { userId: string };

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      include: {
        privilege: true,
      },
    });
    if (!user) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    // Remove password from user data
    const { password: _, ...userWithoutPassword } = user;

    const userData = {
      id: userWithoutPassword.id,
      email: userWithoutPassword.email,
      name: userWithoutPassword.name,
      userType: userWithoutPassword.userType,
      phone: userWithoutPassword.phone,
      privilege: userWithoutPassword.privilege,
      aadharNumber: userWithoutPassword.aadharNumber,
      pan: userWithoutPassword.pan,
      gstNumber: userWithoutPassword.gstNumber,
      address: userWithoutPassword.address,
    };

    // Generate new access token
    const accessToken = jwt.sign(
      { ...userData },
      process.env.ACCESS_TOKEN_JWT_SECRET!,
      { expiresIn: +process.env.ACCESS_TOKEN_JWT_EXPIRY! }
    );

    res.cookie("accessToken", accessToken, {
      maxAge: +process.env.ACCESS_TOKEN_COOKIE_EXPIRY!,
      path: "/",
    })
      .send({ accessToken, user: userData });
  } catch (error: any) {
    if (
      error.name === "TokenExpiredError" ||
      error.name === "JsonWebTokenError"
    ) {
      console.log("Error while refreshing access token\n", error);
      return res
        .status(401)
        .json({ message: "Invalid or expired refresh token" });
    }
    console.error("Error refreshing access token:\n", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const decodeAccessToken = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    // Get fresh user data from database
    const user = await prisma.user.findUnique({
      where: { id: (req.user as any).id },
      include: {
        privilege: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    res.json({ user: userWithoutPassword });
  } catch (error) {
    console.error("Error decoding access token:\n", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getUserProfile = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const userId = (req.user as any).id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        privilege: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    res.json({ user: userWithoutPassword });
  } catch (error) {
    console.error("Error getting user profile:\n", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const assignPrivilege = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const { userId, privilegeId } = req.body;

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if privilege exists
    const privilege = await prisma.userPrivilege.findUnique({
      where: { id: privilegeId },
    });

    if (!privilege) {
      return res.status(404).json({ message: "Privilege not found" });
    }

    // Update user with new privilege
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { privilegeId },
      include: {
        privilege: true,
      },
    });

    // Remove password from response
    const { password: _, ...userWithoutPassword } = updatedUser;

    res.json({
      message: "Privilege assigned successfully",
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error("Error assigning privilege:\n", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;
  // Implement forgot password logic here
  res.status(501).json({ message: "Not implemented yet" });
};

export const changePassword = async (req: Request, res: Response) => {
  const { oldPassword, newPassword } = req.body;
  // Implement change password logic here
  res.status(501).json({ message: "Not implemented yet" });
};
