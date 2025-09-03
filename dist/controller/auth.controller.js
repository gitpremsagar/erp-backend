"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePassword = exports.forgotPassword = exports.assignPrivilege = exports.getUserProfile = exports.decodeAccessToken = exports.refreshAccessToken = exports.signout = exports.signin = exports.signup = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma = new client_1.PrismaClient();
const signup = async (req, res) => {
    const { email, password, name, phone, aadharNumber, pan, gstNumber, address } = req.body;
    //check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
        return res.status(409).json({ message: "User already exists" });
    }
    // Hash the password
    const hashedPassword = await bcrypt_1.default.hash(password, +process.env.BCRYPT_SALT_ROUNDS);
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
            },
            include: {
                privilege: true,
            },
        });
        // Remove password from response
        const { password: _, ...userWithoutPassword } = user;
        // Send response
        res.status(201).json({
            message: "User created successfully",
            user: userWithoutPassword
        });
        return;
    }
    catch (error) {
        console.error("Error creating user:\n", error);
        res.status(500).json({ message: "Internal server error" });
        return;
    }
};
exports.signup = signup;
const signin = async (req, res) => {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
        where: { email },
        include: {
            privilege: true,
        },
    });
    if (!user) {
        return res.status(404).json({ message: "Invalid email or password" });
    }
    const isValidPassword = await bcrypt_1.default.compare(password, user.password);
    if (!isValidPassword) {
        return res.status(401).json({ message: "Invalid email or password" });
    }
    // Remove password from user data
    const { password: _, ...userWithoutPassword } = user;
    const userData = {
        id: userWithoutPassword.id,
        email: userWithoutPassword.email,
        name: userWithoutPassword.name,
        phone: userWithoutPassword.phone,
        privilege: userWithoutPassword.privilege,
        aadharNumber: userWithoutPassword.aadharNumber,
        pan: userWithoutPassword.pan,
        gstNumber: userWithoutPassword.gstNumber,
        address: userWithoutPassword.address,
    };
    // Generate JWT tokens
    const accessToken = jsonwebtoken_1.default.sign({ ...userData }, process.env.ACCESS_TOKEN_JWT_SECRET, { expiresIn: +process.env.ACCESS_TOKEN_JWT_EXPIRY });
    const refreshToken = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.REFRESH_TOKEN_JWT_SECRET, { expiresIn: +process.env.REFRESH_TOKEN_JWT_EXPIRY });
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
        maxAge: +process.env.ACCESS_TOKEN_COOKIE_EXPIRY,
        path: "/",
    })
        .json({ accessToken, user: userData });
    return;
};
exports.signin = signin;
const signout = async (req, res) => {
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
exports.signout = signout;
const refreshAccessToken = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        console.log("Refreshing access token failed: Refresh token is missing");
        return res.status(401).json({ message: "Refresh token is missing" });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN_JWT_SECRET);
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
            phone: userWithoutPassword.phone,
            privilege: userWithoutPassword.privilege,
            aadharNumber: userWithoutPassword.aadharNumber,
            pan: userWithoutPassword.pan,
            gstNumber: userWithoutPassword.gstNumber,
            address: userWithoutPassword.address,
        };
        // Generate new access token
        const accessToken = jsonwebtoken_1.default.sign({ ...userData }, process.env.ACCESS_TOKEN_JWT_SECRET, { expiresIn: +process.env.ACCESS_TOKEN_JWT_EXPIRY });
        res.cookie("accessToken", accessToken, {
            maxAge: +process.env.ACCESS_TOKEN_COOKIE_EXPIRY,
            path: "/",
        })
            .send({ accessToken, user: userData });
    }
    catch (error) {
        if (error.name === "TokenExpiredError" ||
            error.name === "JsonWebTokenError") {
            console.log("Error while refreshing access token\n", error);
            return res
                .status(401)
                .json({ message: "Invalid or expired refresh token" });
        }
        console.error("Error refreshing access token:\n", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.refreshAccessToken = refreshAccessToken;
const decodeAccessToken = async (req, res) => {
    try {
        // Get fresh user data from database
        const user = await prisma.user.findUnique({
            where: { id: req.user.id },
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
    }
    catch (error) {
        console.error("Error decoding access token:\n", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.decodeAccessToken = decodeAccessToken;
const getUserProfile = async (req, res) => {
    try {
        const userId = req.user.id;
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
    }
    catch (error) {
        console.error("Error getting user profile:\n", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.getUserProfile = getUserProfile;
const assignPrivilege = async (req, res) => {
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
    }
    catch (error) {
        console.error("Error assigning privilege:\n", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.assignPrivilege = assignPrivilege;
const forgotPassword = async (req, res) => {
    const { email } = req.body;
    // Implement forgot password logic here
    res.status(501).json({ message: "Not implemented yet" });
};
exports.forgotPassword = forgotPassword;
const changePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    // Implement change password logic here
    res.status(501).json({ message: "Not implemented yet" });
};
exports.changePassword = changePassword;
//# sourceMappingURL=auth.controller.js.map