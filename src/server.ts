
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

// Route Handlers
import authRouteHandler from "./route/auth.route";
import productRouteHandler from "./route/product.route";
import categoryRouteHandler from "./route/category.route";
import groupRouteHandler from "./route/group.route";
import subcategoryRouteHandler from "./route/subcategory.route";

const app = express();

// allow all origins
app.use(
  cors({
    origin: process.env.FRONTEND_DOMAIN || "https://frontend-blogging-platform.vercel.app" || "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 200,
  })
);

app.use(cookieParser());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello World! Edited");
});

// endpoints
app.use("/api/auth", authRouteHandler);
app.use("/api/products", productRouteHandler);
app.use("/api/categories", categoryRouteHandler);
app.use("/api/groups", groupRouteHandler);
app.use("/api/subcategories", subcategoryRouteHandler);

const PORT = process.env.PORT || 3008;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`Visit: http://localhost:${PORT}`);
});
