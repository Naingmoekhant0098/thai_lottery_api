import cron from "node-cron";
import { prisma } from "../../prisma/client";
import logger from "../utils/logger";

const deleteExpiredOtpJob = () => {
  cron.schedule("*/5 * * * *", async () => {
    logger.info("Deleting expired OTPs...");
    // await prisma.otp.deleteMany({
    //   where: {
    //     expiresAt: {
    //       lt: new Date(),
    //     },
    //   },
    // });
    logger.debug("Expired OTPs deleted successfully");
  });
};

export default deleteExpiredOtpJob;
