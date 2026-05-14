import { prisma } from "../../../prisma/client";

const ticketRepository = {
  async createTicket(data: any) {
    return await prisma.ticket.create({
      data,
    });
  },

  async getTicketById(id: string) {
    return await prisma.ticket.findUnique({
      where: { id },
    });
  },

  async getAllTickets() {
    return await prisma.ticket.findMany();
  },

  async getTicketsWithPagination(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    const [tickets, total] = await Promise.all([
      prisma.ticket.findMany({
        skip,
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
      }),

      prisma.ticket.count(),
    ]);

    return {
      data: tickets,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  },

  async updateTicket(id: string, data: any) {
    return await prisma.ticket.update({
      where: { id },
      data,
    });
  },

  async deleteTicket(id: string) {
    return await prisma.ticket.delete({
      where: { id },
    });
  },
};

export default ticketRepository;
