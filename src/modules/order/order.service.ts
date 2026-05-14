import orderRepository from "./order.repository";

const orderService = {
 
  async createOrder(data: {
    customerId: string;
    totalAmount : number;
    ticketIds: string[];
    orderNumber: string;
  }) {
    try {
      const { ticketIds, ...orderData } = data;
      return await orderRepository.createOrderWithTickes(
        {
          ...orderData,
          totalAmount: orderData.totalAmount, // Replace with your calculation logic
        },
        ticketIds
      );
    } catch (error: any) {
      console.error(error.message);
      throw new Error(error.message || "Failed to create order");
    }
  },

  async getOrders() {
    try {
      return await orderRepository.getAllOrders();
    } catch (error: any) {
      throw new Error("Failed to fetch orders");
    }
  },

  async getOrderDetail(id: string) {
    try {
      const order = await orderRepository.getOrderById(id);
      if (!order) {
        throw new Error("Order not found");
      }
      return order;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  async getOrdersWithPagination(page: number = 1, limit: number = 10) {
    try {
      return await orderRepository.getOrdersWithPagination(page, limit);
    } catch (error) {
      throw new Error("Failed to get paginated orders");
    }
  },

  /**
   * Updates order and synchronizes tickets
   */
  async updateOrder(id: string, data: any, ticketIds?: string[]) {
    try {
      const orderExists = await orderRepository.getOrderById(id);
      if (!orderExists) {
        throw new Error("Order not found");
      }

      return await orderRepository.updateOrderWithTickes(id, data, ticketIds);
    } catch (error: any) {
      throw new Error(error.message || "Failed to update order");
    }
  },

  async deleteOrder(id: string) {
    try {
      const orderExists = await orderRepository.getOrderById(id);
      if (!orderExists) {
        throw new Error("Order not found");
      }

      return await orderRepository.deleteOrder(id);
    } catch (error: any) {
      throw new Error("Failed to delete order");
    }
  },
};

export default orderService;
