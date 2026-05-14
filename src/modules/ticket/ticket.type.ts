import Joi from "joi";

export interface Ticket {
  id: string;
  ticketNumber: string;
  firstThree: string;
  lastThree: string;
  lastTwo: string;
  amount: number;
  status: "PENDING" | "APPROVED" | "REJECTED";
  prizeWon?: string;
  rewardAmount?: number;
  expireDate?: Date;
  drawId: string;
  userId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export const ticketSchema = {
  create: Joi.object<Ticket>({
    ticketNumber: Joi.string().required(),
    amount: Joi.number().integer().required(),
    drawId: Joi.string().required(),
    status: Joi.string().required(),
    

  }),
  update: Joi.object<Ticket>({
    ticketNumber: Joi.string().required(),
    amount: Joi.number().integer().required(),
    status: Joi.string().required(),
    drawId: Joi.string().required(),
  }),
};

export default ticketSchema;
