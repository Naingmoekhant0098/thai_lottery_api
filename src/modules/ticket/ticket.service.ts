import ticketRepository from "./ticket.repository";

const ticketService = {
  async createTicket(data: any) {
    try {
      return await ticketRepository.createTicket(data);
    } catch (error : any) {
      console.log(error.messsage)
      throw new Error(error.message);
    }
  },

  async getTickets() {
    try {
      return await ticketRepository.getAllTickets();
    } catch (error : any) {
      throw new Error(error.message);
    }
  },

  async getTicketDetail(id: string) {
    try {
      const ticket = await ticketRepository.getTicketById(id);

      if (!ticket) {
        throw new Error("Ticket not found with the provided ID");
      }

      return ticket;
    } catch (error) {
      throw new Error("Failed to get ticket detail");
    }
  },

  async getTicketsWithPagination(page: number = 1, limit: number = 10) {
    try {
      return await ticketRepository.getTicketsWithPagination(page, limit);
    } catch (error) {
      throw new Error("Failed to get paginated tickets");
    }
  },

  async updateTicket(id: string, data: any) {
    try {
      const isTicketExist = await ticketRepository.getTicketById(id);

      if (!isTicketExist) {
        throw new Error("Ticket not found with the provided ID");
      }

      return await ticketRepository.updateTicket(id, data);
    } catch (error) {
      throw new Error("Failed to update ticket");
    }
  },

  async deleteTicket(id: string) {
    try {
      const isTicketExist = await ticketRepository.getTicketById(id);

      if (!isTicketExist) {
        throw new Error("Ticket not found with the provided ID");
      }

      return await ticketRepository.deleteTicket(id);
    } catch (error) {
      throw new Error("Failed to delete ticket");
    }
  },
};

export default ticketService;
