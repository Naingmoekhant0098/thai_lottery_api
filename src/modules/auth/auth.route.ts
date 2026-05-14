import { Router } from "express";

import { authMiddleware, validatorMiddleware } from "../../middlewares";
import authSchema from "./auth.type";
import authController from "./auth.controller";
const router = Router();
router.post(
  "/login",
  validatorMiddleware.validateBody(authSchema.login),
  authController.login
);
router.get("/me", authMiddleware, authController.me);

export default router;
