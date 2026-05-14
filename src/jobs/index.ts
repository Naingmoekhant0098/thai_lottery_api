import {lotteryDrawJob} from "./lottery_draw";
import notificationJob from "./notification.job";
const startJobs = () => {
  lotteryDrawJob();
  notificationJob();
};

export default startJobs;
