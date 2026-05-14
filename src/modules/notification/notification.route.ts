import { Router } from "express";
import { authMiddleware } from "../../middlewares";
import notificationController from "./notification.controller";
const router = Router();

router.use(authMiddleware);
router.post("/send-to-device", notificationController.sendToDevice);
router.post("/send-to-topic", notificationController.sendToTopic);
router.post("/subscribt-topic", notificationController.subscribeToTopic);
router.post("/subscribt-topic", notificationController.unsubscribeFromTopic);
export default router;
