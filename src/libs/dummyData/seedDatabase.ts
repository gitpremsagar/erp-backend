import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { defaultPrivileges } from "./defaultPrivileges";

const prisma = new PrismaClient();

export const seedDatabase = async () => {
  try {
    console.log("🌱 Starting database seeding...");

    // Seed user privileges
    console.log("📋 Seeding user privileges...");
    for (const privilege of defaultPrivileges) {
      const existingPrivilege = await prisma.userPrivilege.findUnique({
        where: { name: privilege.name },
      });

      if (!existingPrivilege) {
        await prisma.userPrivilege.create({
          data: privilege,
        });
        console.log(`✅ Created privilege: ${privilege.name}`);
      } else {
        console.log(`⏭️  Privilege already exists: ${privilege.name}`);
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
      const adminPrivilege = await prisma.userPrivilege.findUnique({
        where: { name: "ADMIN" },
      });

      if (adminPrivilege) {
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
