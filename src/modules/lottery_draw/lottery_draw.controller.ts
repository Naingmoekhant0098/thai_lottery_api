import { Request, Response } from "express";
import lotteryDrawService from "./lottery_draw.service";
import logger from "../../utils/logger";

const lotteryDrawController = {
  createLotteryDraw: async (req: Request, res: Response) => {
    try {
      const draw = await lotteryDrawService.createLotteryDraw(req.body);

      return res.status(201).json({
        success: true,
        message: "Lottery draw created successfully",
        data: draw,
      });
    } catch (error: any) {
      logger.error(
        "Error in createLotteryDraw controller:",
        error.message || error
      );

      return res.status(500).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to create lottery draw",
      });
    }
  },

  getLotteryDraws: async (_req: Request, res: Response) => {
    try {
      const draws = await lotteryDrawService.getLotteryDraws();

      return res.status(200).json({
        success: true,
        message: "All lottery draws retrieved successfully",
        data: draws,
      });
    } catch (error: any) {
      logger.error(
        "Error in getLotteryDraws controller:",
        error.message || error
      );

      return res.status(500).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to get lottery draws",
      });
    }
  },

  getLotteryDrawsWithPagination: async (req: Request, res: Response) => {
    try {
      // Pass the entire query object to handle page, limit, search, status, and date
      const result = await lotteryDrawService.getLotteryDrawsWithPagination(
        req.query
      );

      return res.status(200).json({
        success: true,
        message: "Paginated lottery draws retrieved successfully",
        ...result,
      });
    } catch (error: any) {
      logger.error(
        "Error in getLotteryDrawsWithPagination controller:",
        error.message || error
      );

      return res.status(500).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to get paginated lottery draws",
      });
    }
  },

  getLotteryDraw: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          success: false,
          message: "Lottery draw ID is required",
        });
      }

      const draw = await lotteryDrawService.getLotteryDrawDetail(id);

      if (!draw) {
        return res.status(404).json({
          success: false,
          message: "Lottery draw not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Lottery draw details retrieved successfully",
        data: draw,
      });
    } catch (error: any) {
      logger.error(
        "Error in getLotteryDraw controller:",
        error.message || error
      );

      return res.status(500).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to get lottery draw detail",
      });
    }
  },

  updateLotteryDraw: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          success: false,
          message: "Lottery draw ID is required",
        });
      }
      const draw = await lotteryDrawService.getLotteryDrawDetail(id);
      if (!draw) {
        return res.status(404).json({
          success: false,
          message: "Lottery draw not found",
        });
      }
      const updatedDraw = await lotteryDrawService.updateLotteryDraw(
        id,
        req.body
      );
      return res.status(200).json({
        success: true,
        message: "Lottery draw updated successfully",
        data: updatedDraw,
      });
    } catch (error: any) {
      logger.error(
        "Error in updateLotteryDraw controller:",
        error.message || error
      );

      return res.status(500).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to update lottery draw",
      });
    }
  },

  deleteLotteryDraw: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          success: false,
          message: "Lottery draw ID is required",
        });
      }

      await lotteryDrawService.deleteLotteryDraw(id);

      return res.status(200).json({
        success: true,
        message: `Lottery draw with id ${id} deleted successfully`,
      });
    } catch (error: any) {
      logger.error(
        "Error in deleteLotteryDraw controller:",
        error.message || error
      );

      return res.status(500).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to delete lottery draw",
      });
    }
  },
};

export default lotteryDrawController;
