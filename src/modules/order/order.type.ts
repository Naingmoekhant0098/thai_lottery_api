import Joi from "joi";

export interface Order {
  id?: string;
  orderNumber?: string;
  totalAmount: number;
  status: "PENDING" | "COMPLETED" | "CANCELLED";
  customerId: string;
  ticketIds: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export const orderSchema = {
  create: Joi.object<Order>({
    customerId: Joi.string().required().messages({
      "string.empty": "Customer ID is required",
    }),
    totalAmount: Joi.number().integer().min(0).required(),
    ticketIds: Joi.array()
      .items(Joi.string().required())
      .min(1)
      .required()
      .messages({
        "array.min": "At least one ticket must be selected for this order",
      }),
    status: Joi.string().valid("PENDING", "COMPLETED", "CANCELLED").optional(),
  }),

  update: Joi.object<Order>({
    status: Joi.string().valid("PENDING", "COMPLETED", "CANCELLED"),
    totalAmount: Joi.number().integer().min(0),
    ticketIds: Joi.array().items(Joi.string()),
    customerId: Joi.string(),
  }),
};

export default orderSchema;
