import { Router } from "express";
import { authMiddleware, validatorMiddleware } from "../../middlewares";
import orderController from "./order.controller"; // Renamed from ticketController
import orderSchema from "./order.type"; // Renamed from ticketSchema

const router = Router();

router.use(authMiddleware);

router.post(
  "/",
  validatorMiddleware.validateBody(orderSchema.create),
  orderController.createOrder
);

router.get("/", orderController.getOrders);

router.get("/pagination", orderController.getOrdersWithPagination);

router.get("/:id", orderController.getOrder);

router.put(
  "/:id",
  validatorMiddleware.validateBody(orderSchema.update),
  orderController.updateOrder
);

router.delete("/:id", orderController.deleteOrder);

export default router;
