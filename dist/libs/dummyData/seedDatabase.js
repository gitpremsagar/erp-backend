"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedDatabase = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const defaultPrivileges_1 = require("./defaultPrivileges");
const defaultCategories_1 = require("./defaultCategories");
// import { defaultGroups } from "./defaultGroups"; // Removed - Group model no longer exists
const defaultSubCategories_1 = require("./defaultSubCategories");
const defaultProducts_1 = require("./defaultProducts");
const defaultCustomers_1 = require("./defaultCustomers");
const defaultOrders_1 = require("./defaultOrders");
const defaultOrderItems_1 = require("./defaultOrderItems");
const defaultVehicles_1 = require("./defaultVehicles");
const prisma = new client_1.PrismaClient();
const seedDatabase = async () => {
    try {
        console.log("🌱 Starting database seeding...");
        // Seed user privileges
        console.log("📋 Seeding user privileges...");
        for (const privilege of defaultPrivileges_1.defaultPrivileges) {
            const existingPrivileges = await prisma.userPrivilege.findMany({
                where: { name: privilege.name },
            });
            if (existingPrivileges.length === 0) {
                await prisma.userPrivilege.create({
                    data: privilege,
                });
                console.log(`✅ Created privilege: ${privilege.name}`);
            }
            else {
                console.log(`⏭️  Privilege already exists: ${privilege.name}`);
            }
        }
        // Seed categories
        console.log("📂 Seeding categories...");
        const categoryMap = new Map(); // name -> id mapping
        for (const category of defaultCategories_1.defaultCategories) {
            const existingCategory = await prisma.category.findUnique({
                where: { name: category.name },
            });
            if (!existingCategory) {
                const createdCategory = await prisma.category.create({
                    data: category,
                });
                categoryMap.set(category.name, createdCategory.id);
                console.log(`✅ Created category: ${category.name}`);
            }
            else {
                categoryMap.set(category.name, existingCategory.id);
                console.log(`⏭️  Category already exists: ${category.name}`);
            }
        }
        // Seed color codes for stock alerts
        console.log("🎨 Seeding color codes...");
        const existingColorCode = await prisma.colorCode.findFirst();
        if (!existingColorCode) {
            await prisma.colorCode.create({
                data: {
                    lowStockAlertColor: "#FFA500", // Orange
                    lowStockAlertMessage: "Low Stock Alert",
                    overStockAlertColor: "#FF0000", // Red
                    overStockAlertMessage: "Over Stock Alert",
                    inStockAlertColor: "#008000", // Green
                    inStockAlertMessage: "In Stock",
                    expiryAlertColor: "#FF0000", // Red
                    expiryAlertMessage: "Expired Product",
                },
            });
            console.log("✅ Created default color codes");
        }
        else {
            console.log("⏭️  Color codes already exist");
        }
        // Seed subcategories
        console.log("📁 Seeding subcategories...");
        const subCategoryMap = new Map(); // name -> id mapping
        for (const subCategory of defaultSubCategories_1.defaultSubCategories) {
            const categoryId = categoryMap.get(subCategory.categoryName);
            if (!categoryId) {
                console.log(`❌ Category not found for subcategory: ${subCategory.name}`);
                continue;
            }
            const existingSubCategory = await prisma.subCategory.findUnique({
                where: { name: subCategory.name },
            });
            if (!existingSubCategory) {
                const createdSubCategory = await prisma.subCategory.create({
                    data: {
                        name: subCategory.name,
                        description: subCategory.description,
                        categoryId: categoryId,
                    },
                });
                subCategoryMap.set(subCategory.name, createdSubCategory.id);
                console.log(`✅ Created subcategory: ${subCategory.name} (${subCategory.categoryName})`);
            }
            else {
                subCategoryMap.set(subCategory.name, existingSubCategory.id);
                console.log(`⏭️  Subcategory already exists: ${subCategory.name}`);
            }
        }
        // Create default admin user if it doesn't exist
        console.log("👤 Checking for default admin user...");
        const adminEmail = "admin@edigitalindia.com";
        const existingAdmin = await prisma.user.findUnique({
            where: { email: adminEmail },
        });
        let adminUser = existingAdmin;
        if (!existingAdmin) {
            // Get admin privilege
            const adminPrivileges = await prisma.userPrivilege.findMany({
                where: { name: "ADMIN" },
            });
            if (adminPrivileges.length > 0) {
                const adminPrivilege = adminPrivileges[0];
                const hashedPassword = await bcrypt_1.default.hash("admin123", 10);
                adminUser = await prisma.user.create({
                    data: {
                        email: adminEmail,
                        password: hashedPassword,
                        name: "System Administrator",
                        phone: "9999999999",
                        privilegeId: adminPrivilege.id,
                        address: "System Address",
                    },
                });
                console.log("✅ Created default admin user");
                console.log("📧 Email: admin@edigitalindia.com");
                console.log("🔑 Password: admin123");
            }
            else {
                console.log("❌ Admin privilege not found, cannot create admin user");
                return;
            }
        }
        else {
            console.log("⏭️  Default admin user already exists");
        }
        // Seed products
        console.log("🛍️  Seeding products...");
        for (const product of defaultProducts_1.defaultProducts) {
            const categoryId = categoryMap.get(product.categoryName);
            const subCategoryId = subCategoryMap.get(product.subCategoryName);
            if (!categoryId || !subCategoryId) {
                console.log(`❌ Required references not found for product: ${product.name}`);
                console.log(`   Category: ${product.categoryName} (${categoryId ? '✓' : '✗'})`);
                console.log(`   Subcategory: ${product.subCategoryName} (${subCategoryId ? '✓' : '✗'})`);
                console.log(`   Note: groupName '${product.groupName}' is ignored (Group model removed)`);
                continue;
            }
            const existingProduct = await prisma.product.findUnique({
                where: { productCode: product.productCode },
            });
            if (!existingProduct) {
                // Create product with new schema structure
                const createdProduct = await prisma.product.create({
                    data: {
                        name: product.name,
                        mrp: product.mrp,
                        productCode: product.productCode,
                        description: product.description,
                        lowStockLimit: product.lowStockLimit,
                        overStockLimit: product.overStockLimit,
                        grammage: product.grammage,
                        imageUrl: product.imageUrl,
                        categoryId: categoryId,
                        subCategoryId: subCategoryId,
                        creatorId: adminUser.id,
                    },
                });
                // Create stock entry if stock data exists
                if (product.stock && product.stock > 0) {
                    // Use existing data from product or defaults
                    const manufacturingDate = new Date();
                    const arrivalDate = product.stockEntryDate || new Date();
                    const expiryDate = product.expiryDate || new Date();
                    // Calculate validity months from the validity string or use default
                    let validityMonths = 1;
                    if (product.validity) {
                        const validityStr = product.validity.toLowerCase();
                        if (validityStr.includes('month')) {
                            const match = validityStr.match(/(\d+)\s*month/);
                            if (match) {
                                validityMonths = parseInt(match[1]);
                            }
                        }
                    }
                    const stock = await prisma.stock.create({
                        data: {
                            stockId: `STK-${product.productCode}-${Date.now()}`,
                            productId: createdProduct.id,
                            manufacturingDate: manufacturingDate,
                            arrivalDate: arrivalDate,
                            validityMonths: validityMonths,
                            expiryDate: expiryDate,
                            supplierName: "Default Supplier",
                            stockQuantity: product.stock,
                        },
                    });
                    // Create stock record for the initial stock entry
                    await prisma.stockRecord.create({
                        data: {
                            productId: createdProduct.id,
                            changeInStock: product.stock,
                            createdBy: adminUser.id,
                            stockId: stock.stockId,
                            reason: "ARRIVAL_FROM_SUPPLIER",
                        },
                    });
                }
                // Create product tags if they exist
                if (product.tags && product.tags.length > 0) {
                    for (const tagName of product.tags) {
                        // Find or create the tag
                        let tag = await prisma.productTag.findFirst({
                            where: { name: tagName },
                        });
                        if (!tag) {
                            tag = await prisma.productTag.create({
                                data: { name: tagName },
                            });
                        }
                        // Create the relation
                        await prisma.productTagRelation.create({
                            data: {
                                productId: createdProduct.id,
                                productTagId: tag.id,
                            },
                        });
                    }
                }
                console.log(`✅ Created product: ${product.name} (${product.productCode}) - Group: ${product.groupName || 'N/A'} (ignored)`);
            }
            else {
                console.log(`⏭️  Product already exists: ${product.name} (${product.productCode})`);
            }
        }
        // Seed customers
        console.log("👥 Seeding customers...");
        const customerPrivilege = await prisma.userPrivilege.findFirst({
            where: { name: "CUSTOMER" },
        });
        if (!customerPrivilege) {
            console.log("❌ Customer privilege not found, skipping customer seeding");
        }
        else {
            for (const customer of defaultCustomers_1.defaultCustomers) {
                const existingCustomer = await prisma.user.findFirst({
                    where: {
                        OR: [
                            { email: customer.email },
                            { phone: customer.phone },
                            ...(customer.aadharNumber ? [{ aadharNumber: customer.aadharNumber }] : []),
                            ...(customer.pan ? [{ pan: customer.pan }] : []),
                            ...(customer.gstNumber ? [{ gstNumber: customer.gstNumber }] : []),
                        ],
                    },
                });
                if (!existingCustomer) {
                    const hashedPassword = await bcrypt_1.default.hash("customer123", 10);
                    await prisma.user.create({
                        data: {
                            name: customer.name,
                            email: customer.email,
                            phone: customer.phone,
                            password: hashedPassword,
                            privilegeId: customerPrivilege.id,
                            aadharNumber: customer.aadharNumber,
                            pan: customer.pan,
                            gstNumber: customer.gstNumber,
                            address: customer.address || "Business Address",
                        },
                    });
                    console.log(`✅ Created customer: ${customer.name} (${customer.email})`);
                }
                else {
                    console.log(`⏭️  Customer already exists: ${customer.name} (${customer.email})`);
                }
            }
        }
        // Create a sample customer user if it doesn't exist
        console.log("👤 Checking for sample customer user...");
        const customerEmail = "customer@example.com";
        const existingCustomer = await prisma.user.findUnique({
            where: { email: customerEmail },
        });
        if (!existingCustomer) {
            const hashedPassword = await bcrypt_1.default.hash("customer123", 10);
            await prisma.user.create({
                data: {
                    email: customerEmail,
                    password: hashedPassword,
                    name: "Sample Customer",
                    phone: "8888888888",
                    privilegeId: null, // No privilege assigned initially
                    address: "Customer Address",
                },
            });
            console.log("✅ Created sample customer user");
            console.log("📧 Email: customer@example.com");
            console.log("🔑 Password: customer123");
        }
        else {
            console.log("⏭️  Sample customer user already exists");
        }
        // Seed vehicles
        console.log("🚛 Seeding vehicles...");
        const vehicleMap = new Map(); // vehicleNumber -> id mapping
        for (const vehicle of defaultVehicles_1.defaultVehicles) {
            const existingVehicle = await prisma.vehicle.findUnique({
                where: { vehicleNumber: vehicle.vehicleNumber },
            });
            if (!existingVehicle) {
                const createdVehicle = await prisma.vehicle.create({
                    data: vehicle,
                });
                vehicleMap.set(vehicle.vehicleNumber, createdVehicle.id);
                console.log(`✅ Created vehicle: ${vehicle.vehicleName} (${vehicle.vehicleNumber})`);
            }
            else {
                vehicleMap.set(vehicle.vehicleNumber, existingVehicle.id);
                console.log(`⏭️  Vehicle already exists: ${vehicle.vehicleName} (${vehicle.vehicleNumber})`);
            }
        }
        // Seed orders
        console.log("📦 Seeding orders...");
        const orderMap = new Map(); // orderIndex -> id mapping
        for (let i = 0; i < defaultOrders_1.defaultOrders.length; i++) {
            const order = defaultOrders_1.defaultOrders[i];
            // Find customer by email
            const customer = await prisma.user.findUnique({
                where: { email: order.customerEmail },
            });
            if (!customer) {
                console.log(`❌ Customer not found for order ${i + 1}: ${order.customerEmail}`);
                continue;
            }
            // Create delivery address if provided
            let deliveryAddressId;
            if (order.deliveryAddress) {
                const deliveryAddress = await prisma.deliveryAddress.create({
                    data: {
                        userId: customer.id,
                        address: order.deliveryAddress,
                        default: false,
                    },
                });
                deliveryAddressId = deliveryAddress.id;
            }
            // Get vehicle ID if assigned
            let vehicleId;
            if (order.vehicleNumber) {
                vehicleId = vehicleMap.get(order.vehicleNumber);
                if (!vehicleId) {
                    console.log(`⚠️  Vehicle not found for order ${i + 1}: ${order.vehicleNumber}`);
                }
            }
            // Create order
            const createdOrder = await prisma.order.create({
                data: {
                    status: order.status,
                    totalPrice: order.totalPrice,
                    orderDate: order.orderDate,
                    customerId: customer.id,
                    deliveryAddressId: deliveryAddressId,
                    vehicleId: vehicleId,
                },
            });
            orderMap.set(i, createdOrder.id);
            console.log(`✅ Created order ${i + 1}: ${order.status} - ₹${order.totalPrice}`);
        }
        // Seed order items
        console.log("🛒 Seeding order items...");
        for (const orderItem of defaultOrderItems_1.defaultOrderItems) {
            const orderId = orderMap.get(orderItem.orderIndex);
            if (!orderId) {
                console.log(`❌ Order not found for order item: ${orderItem.productCode}`);
                continue;
            }
            // Find product by product code
            const product = await prisma.product.findUnique({
                where: { productCode: orderItem.productCode },
            });
            if (!product) {
                console.log(`❌ Product not found for order item: ${orderItem.productCode}`);
                continue;
            }
            // Find customer from the order
            const order = await prisma.order.findUnique({
                where: { id: orderId },
                include: { customer: true },
            });
            if (!order) {
                console.log(`❌ Order not found for order item: ${orderItem.productCode}`);
                continue;
            }
            // Create order item
            await prisma.orderItem.create({
                data: {
                    orderId: orderId,
                    productId: product.id,
                    quantity: orderItem.quantity,
                    deliveryDate: orderItem.deliveryDate,
                    orderCompleted: orderItem.orderCompleted,
                    customerId: order.customer.id,
                },
            });
            console.log(`✅ Created order item: ${product.name} x${orderItem.quantity} for order ${orderItem.orderIndex + 1}`);
        }
        console.log("🎉 Database seeding completed successfully!");
    }
    catch (error) {
        console.error("❌ Error seeding database:", error);
        throw error;
    }
    finally {
        await prisma.$disconnect();
    }
};
exports.seedDatabase = seedDatabase;
// Run seeding if this file is executed directly
if (require.main === module) {
    (0, exports.seedDatabase)()
        .then(() => {
        console.log("Seeding completed");
        process.exit(0);
    })
        .catch((error) => {
        console.error("Seeding failed:", error);
        process.exit(1);
    });
}
//# sourceMappingURL=seedDatabase.js.map