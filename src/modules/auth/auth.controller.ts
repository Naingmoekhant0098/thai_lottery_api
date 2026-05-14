import { Request, Response } from "express";
import authService from "./auth.service";

const authController = {
  login: async (req: Request, res: Response) => {
    try {
      const loginData = await authService.login(req.body);
      res.status(200).json({ success: true, data: loginData });
    } catch (error: any) {
      res.status(401).json({ success: false, message: error.message });
    }
  },

  me: async (req: Request, res: Response) => {
    try {
      const user: any = req.user;
      if (!user) {
        throw new Error("Unauthorized access");
      }
      const loginData = await authService.me(user.id);
      res.status(200).json({ success: true, data: loginData });
    } catch (error: any) {
      res.status(401).json({ success: false, message: error.message });
    }
  },
};

export default authController;
