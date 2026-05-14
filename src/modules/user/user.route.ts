import { Router } from "express";
import { authMiddleware } from "../../middlewares";
import userController from "./user.controller";
const router = Router();
router.use(authMiddleware);
router.post("/", userController.createUser);
router.get("/", userController.getUsers);
router.get("/:id", userController.getUser);
export default router;
