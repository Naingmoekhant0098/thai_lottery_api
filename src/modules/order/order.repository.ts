import { prisma } from "../../../prisma/client";
import { Prisma } from "@prisma/client";

const orderRepository = {
  // Create a new order
  async createOrder(data: any) {
    return await prisma.order.create({
      data,
      include: {
        tickets: true, // Usually helpful to see tickets upon creation
      },
    });
  },

  async createOrderWithTickes(data: any, tickets: string[]) {
    return await prisma.$transaction(async (tx) => {
      const newOrder = await tx.order.create({
        data,
      });

      await tx.ticket.updateMany({
        where: {
          id: { in: tickets },
        },
        data: {
          isSold: true,
          orderId: newOrder.id,
        },
      });

      return newOrder;
    });
  },

  async updateOrderWithTickes(id: string, data: any, newTickets?: string[]) {
    return await prisma.$transaction(async (tx) => {
      const updatedOrder = await tx.order.update({
        where: { id },
        data,
      });

      if (newTickets) {
        await tx.ticket.updateMany({
          where: {
            orderId: id,
            id: { notIn: newTickets },
          },
          data: {
            isSold: false,
            orderId: null,
          },
        });
        await tx.ticket.updateMany({
          where: {
            id: { in: newTickets },
          },
          data: {
            isSold: true,
            orderId: id,
          },
        });
      }

      return updatedOrder;
    });
  },

  // Get order by ID with related data
  async getOrderById(id: string) {
    return await prisma.order.findUnique({
      where: { id },
      include: {
        customer: true,
        tickets: true,
      },
    });
  },

  // Get order by the unique business order number
  async getOrderByNumber(orderNumber: string) {
    return await prisma.order.findUnique({
      where: { orderNumber },
    });
  },

  // Fetch all orders
  async getAllOrders() {
    return await prisma.order.findMany({
      include: {
        _count: {
          select: { tickets: true },
        },
      },
    });
  },

  // Paginated orders for admin dashboards
  async getOrdersWithPagination(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        skip,
        take: limit,
        include: {
          customer: {
            select: { name: true, phone: true }, // Example: limited customer info
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      }),
      prisma.order.count(),
    ]);

    return {
      data: orders,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  },

  async updateOrder(id: string, data: Prisma.OrderUpdateInput) {
    return await prisma.order.update({
      where: { id },
      data,
    });
  },

  // Delete an order
  async deleteOrder(id: string) {
    return await prisma.order.delete({
      where: { id },
    });
  },
};

export default orderRepository;
