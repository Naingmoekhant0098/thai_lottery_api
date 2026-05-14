import { Request, Response, NextFunction } from "express";
import notificationService from "./notification.service";

const notificationController = {
  async sendToDevice(req: Request, res: Response, next: NextFunction) {
    try {
      const { token, title, body, data } = req.body;

      const result = await notificationService.sendToDevice({
        token,
        title,
        body,
        data,
      });

      res.status(200).json({
        success: true,
        message: "Notification sent successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },

  async sendToTopic(req: Request, res: Response, next: NextFunction) {
    try {
      const { topic, title, body, data } = req.body;

      const result = await notificationService.sendToTopic({
        topic,
        title,
        body,
        data,
      });

      res.status(200).json({
        success: true,
        message: "Topic notification sent successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },

  async subscribeToTopic(req: Request, res: Response, next: NextFunction) {
    try {
      const { token, topic } = req.body;

      const result = await notificationService.subscribeToTopic(token, topic);

      res.status(200).json({
        success: true,
        message: "Subscribed to topic successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },

  async unsubscribeFromTopic(req: Request, res: Response, next: NextFunction) {
    try {
      const { token, topic } = req.body;

      const result = await notificationService.unsubscribeFromTopic(
        token,
        topic
      );

      res.status(200).json({
        success: true,
        message: "Unsubscribed from topic successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },
};

export default notificationController;
