import { Router } from "express";
import { authMiddleware, validatorMiddleware } from "../../middlewares";
import lotteryDrawController from "./lottery_draw.controller";
import lotteryDrawSchema from "./lottery_draw.type"; 

const router = Router();
router.use(authMiddleware);

router.post(
  "/",
  validatorMiddleware.validateBody(lotteryDrawSchema.create),
  lotteryDrawController.createLotteryDraw
);

router.get("/", lotteryDrawController.getLotteryDraws);

router.get("/pagination", lotteryDrawController.getLotteryDrawsWithPagination);

router.get("/:id", lotteryDrawController.getLotteryDraw);

router.put(
  "/:id",
  validatorMiddleware.validateBody(lotteryDrawSchema.update),
  lotteryDrawController.updateLotteryDraw
);
router.delete("/:id", lotteryDrawController.deleteLotteryDraw);

export default router;