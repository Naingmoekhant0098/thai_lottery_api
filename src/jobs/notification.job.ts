import cron from "node-cron";
import { notificationService } from "../modules/notification";

const notificationJob = () => {
  cron.schedule(
    "0 9 * * *",
    async () => {
      console.log("Sending daily notification");
      await notificationService.sendToTopic({
        topic: "users",
        title: "Daily Reminder",
        body: "Good morning 🌞",
      });
    },
    {
      timezone: "Asia/Yangon",
    }
  );
};

export default notificationJob;
