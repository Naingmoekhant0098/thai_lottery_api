import { Router } from "express";
import { authMiddleware, validatorMiddleware } from "../../middlewares";
import ticketController from "./ticket.controller";
import ticketSchema from "./ticket.type";

const router = Router();
router.use(authMiddleware);
router.post(
  "/",
  validatorMiddleware.validateBody(ticketSchema.create),
  ticketController.createTicket
);
router.get("/", ticketController.getTickets);
router.get("/pagination", ticketController.getTicketsWithPagination);
router.get("/:id", ticketController.getTicket);
router.put(
  "/:id",
  validatorMiddleware.validateBody(ticketSchema.update),
  ticketController.updateTicket
);
router.delete("/:id", ticketController.deleteTicket);

export default router;
