import bcrypt from "bcryptjs";
import userService from "./user.service";
import logger from "../../utils/logger";
const seedUsers = async () => {
  try {
    logger.info("✅ User seeded started");
    await userService.createUser(
        {
            name: "Z Admin",
            phone: "09763320740",
            password: "Admin@123",
            role: "admin",
        }
    )
    logger.info("✅ User seeded successfully");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeder error:", error);
    process.exit(1);
  }
};

seedUsers();
