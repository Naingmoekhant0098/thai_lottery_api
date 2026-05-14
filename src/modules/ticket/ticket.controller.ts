import { Request, Response } from "express";
import ticketService from "./ticket.service";
import logger from "../../utils/logger";

const ticketController = {
  createTicket: async (req: Request, res: Response) => {
    try {
      const { ticketNumber } = req.body;
      const ticketNo = String(ticketNumber);
      req.body.firstThree = ticketNo.slice(0, 3);
      req.body.lastThree = ticketNo.slice(-3);
      req.body.lastTwo = ticketNo.slice(-2);

      const ticket = await ticketService.createTicket(req.body);
      return res.status(201).json({
        success: true,
        message: "Ticket created successfully",
        data: ticket,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message:
          error instanceof Error ? error.message : "Failed to create ticket",
        error: error.message,
      });
    }
  },

  getTickets: async (_req: Request, res: Response) => {
    try {
      const tickets = await ticketService.getTickets();

      return res.status(200).json({
        success: true,
        message: "All tickets retrieved successfully",
        data: tickets,
      });
    } catch (error: any) {
      logger.error("Error in getTickets controller:", error.message || error);

      return res.status(500).json({
        success: false,
        message:
          error instanceof Error ? error.message : "Failed to get tickets",
      });
    }
  },

  getTicketsWithPagination: async (req: Request, res: Response) => {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;

      const tickets = await ticketService.getTicketsWithPagination(page, limit);

      return res.status(200).json({
        success: true,
        message: "Paginated tickets retrieved successfully",
        ...tickets,
      });
    } catch (error: any) {
      logger.error(
        "Error in getTicketsWithPagination controller:",
        error.message || error
      );

      return res.status(500).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to get paginated tickets",
      });
    }
  },

  getTicket: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      // 1. Check if ID exists
      if (!id) {
        return res.status(400).json({
          success: false,
          message: "Ticket ID is required",
        });
      }

      // 2. Fetch ticket
      const ticket = await ticketService.getTicketDetail(id);

      // 3. Handle ticket not found
      if (!ticket) {
        return res.status(404).json({
          success: false,
          message: "Ticket not found",
        });
      }

      // 4. Success response
      return res.status(200).json({
        success: true,
        message: "Ticket details retrieved successfully",
        data: ticket,
      });
    } catch (error: any) {
      logger.error("Error in getTicket controller:", error.message || error);

      return res.status(500).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to get ticket detail",
      });
    }
  },

  updateTicket: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      // 1. Validate ID
      if (!id) {
        return res.status(400).json({
          success: false,
          message: "Ticket ID is required",
        });
      }

      // 2. Check if ticket exists
      const ticket = await ticketService.getTicketDetail(id);

      if (!ticket) {
        return res.status(404).json({
          success: false,
          message: "Ticket not found",
        });
      }

      // 3. Update ticket
      const updatedTicket = await ticketService.updateTicket(id, req.body);

      // 4. Success response
      return res.status(200).json({
        success: true,
        message: "Ticket updated successfully",
        data: updatedTicket,
      });
    } catch (error: any) {
      logger.error("Error in updateTicket controller:", error.message || error);

      return res.status(500).json({
        success: false,
        message:
          error instanceof Error ? error.message : "Failed to update ticket",
      });
    }
  },

  deleteTicket: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          success: false,
          message: "Ticket ID is required",
        });
      }

      await ticketService.deleteTicket(id);

      return res.status(200).json({
        success: true,
        message: `Ticket with id ${id} deleted successfully`,
      });
    } catch (error: any) {
      logger.error("Error in deleteTicket controller:", error.message || error);

      return res.status(500).json({
        success: false,
        message:
          error instanceof Error ? error.message : "Failed to delete ticket",
      });
    }
  },
};

export default ticketController;
