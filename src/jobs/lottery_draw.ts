import cron from "node-cron";


import { lotteryDrawService } from "../modules/lottery_draw";
export const lotteryDrawJob = async () => {
  cron.schedule("* * * * *", async () => {
    console.log("🔍 Checking Thai Lottery Status...");
    try {
      await lotteryDrawService.syncThaiLotteryResults();
    } catch (error) {
      console.error("❌ Cron Job Error:", error);
    }
  });
};
