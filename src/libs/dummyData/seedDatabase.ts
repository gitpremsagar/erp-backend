import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { defaultPrivileges } from "./defaultPrivileges";
import { defaultCategories } from "./defaultCategories";
import { defaultGroups } from "./defaultGroups";
import { defaultSubCategories } from "./defaultSubCategories";
import { defaultProducts } from "./defaultProducts";
import { defaultCustomers } from "./defaultCustomers";

const prisma = new PrismaClient();

export const seedDatabase = async () => {
  try {
    console.log("🌱 Starting database seeding...");

    // Seed user privileges
    console.log("📋 Seeding user privileges...");
    for (const privilege of defaultPrivileges) {
      const existingPrivileges = await prisma.userPrivilege.findMany({
        where: { name: privilege.name },
      });

      if (existingPrivileges.length === 0) {
        await prisma.userPrivilege.create({
          data: privilege,
        });
        console.log(`✅ Created privilege: ${privilege.name}`);
      } else {
        console.log(`⏭️  Privilege already exists: ${privilege.name}`);
      }
    }

    // Seed categories
    console.log("📂 Seeding categories...");
    const categoryMap = new Map<string, string>(); // name -> id mapping
    
    for (const category of defaultCategories) {
      const existingCategory = await prisma.category.findUnique({
        where: { name: category.name },
      });

      if (!existingCategory) {
        const createdCategory = await prisma.category.create({
          data: category,
        });
        categoryMap.set(category.name, createdCategory.id);
        console.log(`✅ Created category: ${category.name}`);
      } else {
        categoryMap.set(category.name, existingCategory.id);
        console.log(`⏭️  Category already exists: ${category.name}`);
      }
    }

    // Seed groups
    console.log("🏷️  Seeding groups...");
    const groupMap = new Map<string, string>(); // name -> id mapping
    
    for (const group of defaultGroups) {
      const existingGroup = await prisma.group.findUnique({
        where: { name: group.name },
      });

      if (!existingGroup) {
        const createdGroup = await prisma.group.create({
          data: group,
        });
        groupMap.set(group.name, createdGroup.id);
        console.log(`✅ Created group: ${group.name}`);
      } else {
        groupMap.set(group.name, existingGroup.id);
        console.log(`⏭️  Group already exists: ${group.name}`);
      }
    }

    // Seed subcategories
    console.log("📁 Seeding subcategories...");
    const subCategoryMap = new Map<string, string>(); // name -> id mapping
    
    for (const subCategory of defaultSubCategories) {
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
      } else {
        subCategoryMap.set(subCategory.name, existingSubCategory.id);
        console.log(`⏭️  Subcategory already exists: ${subCategory.name}`);
      }
    }

    // Seed products
    console.log("🛍️  Seeding products...");
    for (const product of defaultProducts) {
      const categoryId = categoryMap.get(product.categoryName);
      const groupId = groupMap.get(product.groupName);
      const subCategoryId = subCategoryMap.get(product.subCategoryName);
      
      if (!categoryId || !groupId || !subCategoryId) {
        console.log(`❌ Required references not found for product: ${product.name}`);
        console.log(`   Category: ${product.categoryName} (${categoryId ? '✓' : '✗'})`);
        console.log(`   Group: ${product.groupName} (${groupId ? '✓' : '✗'})`);
        console.log(`   Subcategory: ${product.subCategoryName} (${subCategoryId ? '✓' : '✗'})`);
        continue;
      }

      const existingProduct = await prisma.product.findUnique({
        where: { productCode: product.productCode },
      });

      if (!existingProduct) {
        await prisma.product.create({
          data: {
            name: product.name,
            mrp: product.mrp,
            productCode: product.productCode,
            description: product.description,
            expiryDate: product.expiryDate,
            validity: product.validity,
            stock: product.stock,
            stockEntryDate: product.stockEntryDate,
            lowStockLimit: product.lowStockLimit,
            overStockLimit: product.overStockLimit,
            grammage: product.grammage,
            tags: product.tags,
            imageUrl: product.imageUrl,
            categoryId: categoryId,
            groupId: groupId,
            subCategoryId: subCategoryId,
          },
        });
        console.log(`✅ Created product: ${product.name} (${product.productCode})`);
      } else {
        console.log(`⏭️  Product already exists: ${product.name} (${product.productCode})`);
      }
    }

    // Create default admin user if it doesn't exist
    console.log("👤 Checking for default admin user...");
    const adminEmail = "admin@edigitalindia.com";
    const existingAdmin = await prisma.user.findUnique({
      where: { email: adminEmail },
    });

    if (!existingAdmin) {
      // Get admin privilege
      const adminPrivileges = await prisma.userPrivilege.findMany({
        where: { name: "ADMIN" },
      });

      if (adminPrivileges.length > 0) {
        const adminPrivilege = adminPrivileges[0];
        const hashedPassword = await bcrypt.hash("admin123", 10);
        
        await prisma.user.create({
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
      } else {
        console.log("❌ Admin privilege not found, cannot create admin user");
      }
    } else {
      console.log("⏭️  Default admin user already exists");
    }

    // Seed customers
    console.log("👥 Seeding customers...");
    const customerPrivilege = await prisma.userPrivilege.findFirst({
      where: { name: "CUSTOMER" },
    });

    if (!customerPrivilege) {
      console.log("❌ Customer privilege not found, skipping customer seeding");
    } else {
      for (const customer of defaultCustomers) {
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
          const hashedPassword = await bcrypt.hash("customer123", 10);
          
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
        } else {
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
      const hashedPassword = await bcrypt.hash("customer123", 10);
      
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
    } else {
      console.log("⏭️  Sample customer user already exists");
    }

    console.log("🎉 Database seeding completed successfully!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};

// Run seeding if this file is executed directly
if (require.main === module) {
  seedDatabase()
    .then(() => {
      console.log("Seeding completed");
      process.exit(0);
    })
    .catch((error) => {
      console.error("Seeding failed:", error);
      process.exit(1);
    });
}
