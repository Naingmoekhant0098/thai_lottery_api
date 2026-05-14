import { Request, Response } from "express";
import userService from "./user.service";
import logger from "../../utils/logger";

const userController = {
  createUser: async (req: Request, res: Response) => {
    const user = await userService.createUser(req.body);
    res.json({ success: true, data: user });
  },

  deleteUsers: async (_req: Request, res: Response) => {
    await userService.deleteUsers();
    res.json({ success: true, message: "All users deleted successfully" });
  },

  getUser: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      // 1. Check if ID exists
      if (!id) {
        return res.status(400).json({
          success: false,
          message: "User ID is required",
        });
      }

      // 2. Fetch user
      const user = await userService.getUserDetail(id);

      // 3. Handle case where user is not found in database
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      // 4. Success Response
      return res.status(200).json({
        success: true,
        message: "User details retrieved successfully",
        data: user,
      });
    } catch (error: any) {
      logger.error("Error in getUser controller:", error.message || error);
      return res.status(500).json({
        success: false,
        message:
          error instanceof Error ? error.message : "Failed to get user detail",
      });
    }
  },
  getUsers: async (_req: Request, res: Response) => {
    try {
      const users = await userService.getUsers();
      res.status(200).json({
        success: true,
        message: "All users retrieved successfully",
        data: users,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to get users" });
    }
  },
  updateUser: async (_req: Request, res: Response) => {

    try {
      const { id } = _req.params;
      if (!id) {
        return res.status(400).json({
          success: false,
          message: "User ID is required",
        });
      }
      
      const user = await userService.getUserDetail(id);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
      return res.status(200).json({
        success: true,
        message: "User details retrieved successfully",
        data: user,
      });
    } catch (error: any) {
      logger.error("Error in getUser controller:", error.message || error);
      return res.status(500).json({
        success: false,
        message:
          error instanceof Error ? error.message : "Failed to get user detail",
      });
    }



   
     
  },

  deleteUserById: async (req: Request, res: Response) => {
    const { id } = req.params;
    await userService.deleteUserById(id as string);
    res.json({
      success: true,
      message: `User with id ${id} deleted successfully`,
    });
  },
};
export default userController;
