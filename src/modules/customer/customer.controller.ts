import { Request, Response } from "express";
import customerService from "./customer.service";
import logger from "../../utils/logger";

const customerController = {
  createCustomer: async (req: Request, res: Response) => {
   logger.info("Received request to create customer with data:", req.body);
    try {
      const customer = await customerService.createCustomer(
        req.body
      );

    

      return res.status(201).json({
        success: true,
        message: "Customer created successfully",
        data: customer,
      });
    } catch (error: any) {
      console.log(error)
      logger.error(
        "Error in createCustomer controller:",
        error.message || error
      );

      return res.status(500).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to create customer",
      });
    }
  },

  getCustomers: async (_req: Request, res: Response) => {
    try {
      const customers = await customerService.getCustomers();

      return res.status(200).json({
        success: true,
        message: "All customers retrieved successfully",
        data: customers,
      });
    } catch (error: any) {
      logger.error(
        "Error in getCustomers controller:",
        error.message || error
      );

      return res.status(500).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to get customers",
      });
    }
  },

  getCustomersWithPagination: async (
    req: Request,
    res: Response
  ) => {
    try {
  
      const search = req.query.search as string;
      const status = req.query.status as string;
  

      const customers =
        await customerService.getCustomersWithPagination(req.query);
  
      return res.status(200).json({
        success: true,
        message: "Paginated customers retrieved successfully",
        ...customers,
      });
    } catch (error: any) {
      logger.error(
        "Error in getCustomersWithPagination controller:",
        error.message || error
      );
  
      return res.status(500).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to get paginated customers",
      });
    }
  },
  getCustomer: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      // 1. Check if ID exists
      if (!id) {
        return res.status(400).json({
          success: false,
          message: "Customer ID is required",
        });
      }

      // 2. Fetch customer
      const customer =
        await customerService.getCustomerDetail(id);

      // 3. Handle customer not found
      if (!customer) {
        return res.status(404).json({
          success: false,
          message: "Customer not found",
        });
      }

      // 4. Success response
      return res.status(200).json({
        success: true,
        message: "Customer details retrieved successfully",
        data: customer,
      });
    } catch (error: any) {
      logger.error(
        "Error in getCustomer controller:",
        error.message || error
      );

      return res.status(500).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to get customer detail",
      });
    }
  },

  updateCustomer: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      // 1. Validate ID
      if (!id) {
        return res.status(400).json({
          success: false,
          message: "Customer ID is required",
        });
      }

      // 2. Check if customer exists
      const customer =
        await customerService.getCustomerDetail(id);

      if (!customer) {
        return res.status(404).json({
          success: false,
          message: "Customer not found",
        });
      }

      // 3. Update customer
      const updatedCustomer =
        await customerService.updateCustomer(
          id,
          req.body
        );

      // 4. Success response
      return res.status(200).json({
        success: true,
        message: "Customer updated successfully",
        data: updatedCustomer,
      });
    } catch (error: any) {
      logger.error(
        "Error in updateCustomer controller:",
        error.message || error
      );

      return res.status(500).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to update customer",
      });
    }
  },

  deleteCustomer: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          success: false,
          message: "Customer ID is required",
        });
      }

      await customerService.deleteCustomer(id);

      return res.status(200).json({
        success: true,
        message: `Customer with id ${id} deleted successfully`,
      });
    } catch (error: any) {
      logger.error(
        "Error in deleteCustomer controller:",
        error.message || error
      );

      return res.status(500).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to delete customer",
      });
    }
  },
};

export default customerController;