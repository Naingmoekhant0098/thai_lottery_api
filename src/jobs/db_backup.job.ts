import cron from "node-cron";
import { exec } from "child_process";
import logger from "../utils/logger";

const backupDatabaseJob = () => {
  cron.schedule("0 0 * * *", async () => {
    logger.info("Backing up database...");
    const filename = `backup-${Date.now()}.sql`;
    exec(`pg_dump thai_lottery > backups/${filename}`, (error) => {
      if (error) {
        console.error(error);
      } else {
        console.log("Database backup completed");
      }
    });

    logger.info("Success back up database...");
  });
};

export default backupDatabaseJob;
