import { Router } from "express";
import { authMiddleware, validatorMiddleware } from "../../middlewares";
import customerController from "./customer.controller";
import customerSchema from "./customer.type";

const router = Router();

router.use(authMiddleware);

router.post("/", validatorMiddleware.validateBody(customerSchema.create), customerController.createCustomer);

router.get("/", customerController.getCustomers);

router.get(
  "/pagination",
  customerController.getCustomersWithPagination
);

router.get("/:id", customerController.getCustomer);

router.put("/:id",validatorMiddleware.validateBody(customerSchema.update), customerController.updateCustomer);

router.delete("/:id", customerController.deleteCustomer);

export default router;