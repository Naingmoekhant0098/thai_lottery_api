import cron from "node-cron";
import nodemailer from "nodemailer";
import logger from "../utils/logger";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const emailSchedulerJob = () => {
  cron.schedule("0 8 * * *", async () => {
    logger.info("Sending scheduled emails...");

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "test@gmail.com",
      subject: "Daily Email",
      text: "Hello from scheduler",
    });
    logger.info("Success send scheduled emails...");
  });
};

export default emailSchedulerJob;
