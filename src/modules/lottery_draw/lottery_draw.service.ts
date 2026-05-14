import { getList } from "../../utils/getList";
import { getLotto } from "../../utils/getLotto";
import logger from "../../utils/logger";
import { parseThaiDate } from "../../utils/parseThaiDate";
import lotteryDrawRepository from "./lottery_draw.repository";

const lotteryDrawService = {
  async createLotteryDraw(data: any) {
    try {
      return await lotteryDrawRepository.createLotteryDraw(data);
    } catch (error) {
      throw new Error("Failed to create lottery draw");
    }
  },

  async getLotteryDraws() {
    try {
      return await lotteryDrawRepository.getAllLotteryDraws();
    } catch (error: any) {
      console.log(error.message);
      throw new Error(error.message || "Failed to get lottery draws");
    }
  },

  async getLotteryDrawDetail(id: string) {
    try {
      const draw = await lotteryDrawRepository.getLotteryDrawById(id);

      if (!draw) {
        throw new Error("Lottery draw not found with the provided ID");
      }

      return draw;
    } catch (error: any) {
      throw new Error(error.message || "Failed to get lottery draw detail");
    }
  },

  async getLotteryDrawsWithPagination(params?: any) {
    try {
      return await lotteryDrawRepository.getLotteryDrawsWithPagination(params);
    } catch (error) {
      throw new Error("Failed to get paginated lottery draws");
    }
  },

  async updateLotteryDraw(id: string, data: any) {
    try {
      const isDrawExist = await lotteryDrawRepository.getLotteryDrawById(id);

      if (!isDrawExist) {
        throw new Error("Lottery draw not found with the provided ID");
      }

      return await lotteryDrawRepository.updateLotteryDraw(id, data);
    } catch (error) {
      throw new Error("Failed to update lottery draw");
    }
  },

  async deleteLotteryDraw(id: string) {
    try {
      const isDrawExist = await lotteryDrawRepository.getLotteryDrawById(id);

      if (!isDrawExist) {
        throw new Error("Lottery draw not found with the provided ID");
      }

      return await lotteryDrawRepository.deleteLotteryDraw(id);
    } catch (error) {
      throw new Error("Failed to delete lottery draw");
    }
  },

  //   async syncThaiLotteryResults() {
  //     try {
  //       console.log("🔍 Checking Thai Lottery Status via Service...");
  //       const latestList: any = await getList(1);
  //       if (!latestList || latestList.length === 0) return;

  //       const externalId = latestList[0].id;

  //       const lotto = await getLotto(externalId);

  //       const isIncomplete = lotto.prizes.some((prize: any) =>
  //         prize.number.some((num: string) => num.toLowerCase().includes("x"))
  //       );

  //       if (isIncomplete) {
  //         console.log(
  //           `⏳ Result for Draw ${externalId} is still incomplete. Skipping sync...`
  //         );
  //         return { success: false, message: "Results incomplete" };
  //       }

  //       const drawDate = parseThaiDate(lotto.date);
  //       const expireDate = new Date(drawDate);
  //       expireDate.setDate(expireDate.getDate() + 60);
  //       const existingDraw = await lotteryDrawRepository.getLotteryDrawById(
  //         externalId
  //       );
  //       if (!existingDraw) {
  //         await lotteryDrawRepository.createLotteryDraw({
  //           drawDate,
  //           externalId,
  //           results: lotto,
  //           isClosed: true,
  //           status: "FINISHED",
  //           expireDate,
  //         });
  //         console.log(`✅ Successfully created and closed Draw: ${externalId}`);
  //       } else if (existingDraw.status !== "FINISHED") {
  //         await lotteryDrawRepository.updateLotteryDraw(existingDraw.id, {
  //           results: lotto,
  //           isClosed: true,
  //           status: "FINISHED",
  //         });
  //         console.log(`✅ Successfully updated results for Draw: ${externalId}`);
  //       }

  //       return { success: true, externalId };
  //     } catch (error: any) {
  //       console.error("❌ Sync Service Error:", error);
  //       throw new Error(error.message || "Failed to sync lottery results");
  //     }
  //   },

  async syncThaiLotteryResults() {
    try {
      const latestList: any = await getList(1);
      
      if (!latestList?.length) return;

      const externalId = latestList[0].id;
      const lotto = await getLotto(externalId);
     
      const isMainIncomplete = lotto.prizes.some((p: any) =>
        p.number.some((n: string) => n.toLowerCase().includes("x"))
      );
      const isRunningIncomplete = lotto.runningNumbers.some((p: any) =>
        p.number.some((n: string) => n.toLowerCase().includes("x"))
      );
      const isFullyComplete = !isMainIncomplete && !isRunningIncomplete;
      const drawDate = parseThaiDate(lotto.date);
      const expireDate = new Date(drawDate);
      logger.info(`Logger data is ${expireDate}`)

      expireDate.setDate(expireDate.getDate() + 60);
      const { draw: existingDraw, isFutureDate } =
        await lotteryDrawRepository.getLotteryDrawByDate(drawDate);
      let currentStatus = "UPCOMING";
      if (!isFutureDate && isFullyComplete) {
        currentStatus = "FINISHED";
      }
      const isClosed = isFullyComplete;
      if (!existingDraw) {
        await lotteryDrawRepository.createLotteryDraw({
          drawDate,
          externalId,
          results: lotto,
          isClosed: isClosed,
          status: currentStatus,
          expireDate,
        });
        logger.info(
          `✅ Record အသစ် (${currentStatus}) ကို သိမ်းဆည်းပြီးပါပြီ။`
        );
      } else {
        if (existingDraw.status !== "FINISHED" && isFullyComplete) {
          await lotteryDrawRepository.updateLotteryDraw(existingDraw.id, {
            results: lotto,
            isClosed: true,
            status: "FINISHED",
          });
          logger.info(
            `✅ Existing Draw ကို FINISHED အဖြစ် Update လုပ်လိုက်ပါပြီ။`
          );
        } else if (!isFutureDate && !isFullyComplete) {
          logger.info(`⏳ Draw ထွက်နေဆဲ (PENDING_RESULT)`);
          await lotteryDrawRepository.updateLotteryDraw(existingDraw.id, {
            results: lotto,
            isClosed: false,
            status: "PENDING_RESULT",
          });
        } else {
          logger.info(`✅ Upcoming lottery draw continue..., ${isFutureDate}`);
          await lotteryDrawRepository.updateLotteryDraw(existingDraw.id, {
            results: lotto,
            isClosed: false,
            status: "UPCOMING",
          });
        }
      }

      return { success: true };
    } catch (error: any) {
      logger.error("❌ Sync Error:", error);
    }
  },
};

export default lotteryDrawService;
