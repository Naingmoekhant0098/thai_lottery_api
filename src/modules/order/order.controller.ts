import { Request, Response } from "express";
import orderService from "./order.service"; // Renamed from ticketService
import logger from "../../utils/logger";

const orderController = {
  createOrder: async (req: Request, res: Response) => {
    try {
      const { ticketIds, customerId, totalAmount } = req.body;

      // 1. Validation
      if (!ticketIds || !Array.isArray(ticketIds) || ticketIds.length === 0) {
        return res.status(400).json({
          success: false,
          message: "At least one ticket ID is required",
        });
      }

      const datePart = new Date()
        ?.toISOString()
        ?.split("T")[0]
        ?.replace(/-/g, "");
      const randomPart = Math.random()
        .toString(36)
        .substring(2, 6)
        .toUpperCase();
      const orderNumber = `ORD-${datePart}-${randomPart}`;
      const order = await orderService.createOrder({
        orderNumber,
        customerId,
        totalAmount,
        ticketIds,
      });

      return res.status(201).json({
        success: true,
        message: "Order created successfully",
        data: order,
      });
    } catch (error: any) {
      logger.error("Error in createOrder controller:", error.message);
      return res.status(500).json({
        success: false,
        message: error.message || "Failed to create order",
      });
    }
  },

  getOrders: async (_req: Request, res: Response) => {
    try {
      const orders = await orderService.getOrders();
      return res.status(200).json({
        success: true,
        message: "All orders retrieved successfully",
        data: orders,
      });
    } catch (error: any) {
      logger.error("Error in getOrders controller:", error.message);
      return res.status(500).json({
        success: false,
        message: "Failed to get orders",
      });
    }
  },

  getOrdersWithPagination: async (req: Request, res: Response) => {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;

      const result = await orderService.getOrdersWithPagination(page, limit);

      return res.status(200).json({
        success: true,
        message: "Paginated orders retrieved successfully",
        ...result,
      });
    } catch (error: any) {
      logger.error("Error in getOrdersWithPagination:", error.message);
      return res.status(500).json({
        success: false,
        message: "Failed to get paginated orders",
      });
    }
  },

  getOrder: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const order = await orderService.getOrderDetail(id!);

      return res.status(200).json({
        success: true,
        message: "Order details retrieved successfully",
        data: order,
      });
    } catch (error: any) {
      const status = error.message.includes("not found") ? 404 : 500;
      return res.status(status).json({
        success: false,
        message: error.message,
      });
    }
  },

  updateOrder: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { ticketIds, ...updateData } = req.body;

      const updatedOrder = await orderService.updateOrder(
        id!,
        updateData,
        ticketIds
      );

      return res.status(200).json({
        success: true,
        message: "Order updated successfully",
        data: updatedOrder,
      });
    } catch (error: any) {
      logger.error("Error in updateOrder controller:", error.message);
      return res.status(500).json({
        success: false,
        message: error.message || "Failed to update order",
      });
    }
  },

  deleteOrder: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await orderService.deleteOrder(id!);

      return res.status(200).json({
        success: true,
        message: `Order ${id} deleted successfully`,
      });
    } catch (error: any) {
      logger.error("Error in deleteOrder controller:", error.message);
      return res.status(500).json({
        success: false,
        message: error.message || "Failed to delete order",
      });
    }
  },
};

export default orderController;
