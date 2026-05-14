import Joi from "joi";
export enum DrawStatus {
  UPCOMING = "UPCOMING",
  ONGOING = "ONGOING",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}
export interface LotteryDraw {
  id: string;
  drawDate: Date;
  isClosed: boolean;
  results?: any;
  status: DrawStatus;
  expireDate: Date;
  createdAt: Date;
}
export const lotteryDrawSchema = {
  create: Joi.object<LotteryDraw>({
    drawDate: Joi.date().required().messages({
      "date.base": "Draw date must be a valid date",
      "any.required": "Draw date is required",
    }),
    expireDate: Joi.date().required().greater(Joi.ref("drawDate")).messages({
      "date.greater": "Expire date must be after the draw date",
      "any.required": "Expire date is required",
    }),
    isClosed: Joi.boolean().default(false),
    status: Joi.string()
      .valid(...Object.values(DrawStatus))
      .default(DrawStatus.UPCOMING),
  }),

  update: Joi.object<LotteryDraw>({
    drawDate: Joi.date().optional(),
    expireDate: Joi.date().optional(),
    isClosed: Joi.boolean().optional(),
    status: Joi.string()
      .valid(...Object.values(DrawStatus))
      .optional(),
  }),
};

export default lotteryDrawSchema;
