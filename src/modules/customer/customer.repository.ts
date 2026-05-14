import { prisma } from "../../../prisma/client";

const customerRepository = {
  async createCustomer(data: any) {
    return await prisma.customer.create({
      data,
    });
  },

  async getCustomerById(id: string) {
    return await prisma.customer.findUnique({
      where: { id },
    });
  },

  async getAllCustomers() {
    return await prisma.customer.findMany();
  },

  async getCustomersWithPagination(params?: any) {
    const page = Math.max(1, Number(params?.page) || 1);
    const limit = Math.max(1, Number(params?.limit) || 10);
    const skip = (page - 1) * limit;
  
    const where: any = {};
    if (params?.search && typeof params.search === 'string') {
      where.OR = [
        { name: { contains: params.search } },
        { phone: { contains: params.search } },
      ];
    }
    if (params?.status) {
      where.status = params.status;
    }
    if (params?.date) {
      const startOfDay = new Date(params.date);
      startOfDay.setHours(0, 0, 0, 0);
    
      const endOfDay = new Date(params.date);
      endOfDay.setHours(23, 59, 59, 999);
    
      where.createdAt = {
        gte: startOfDay,
        lte: endOfDay,
      };
    }
  
    try {
      const [customers, total] = await Promise.all([
        prisma.customer.findMany({
          where,
          skip,
          take: limit,
          orderBy: {
            id: "desc", // Using 'id' is safer unless you're sure 'createdAt' exists
          },
        }),
        prisma.customer.count({ where }),
      ]);
  
      return {
        data: customers,
        meta: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit) || 1,
        },
      };
    } catch (error) {
      console.error("Pagination Error:", error);
      throw error; 
    }
  },
  async updateCustomer(id: string, data: any) {
    return await prisma.customer.update({
      where: { id },
      data,
    });
  },

  async deleteCustomer(id: string) {
    return await prisma.customer.delete({
      where: { id },
    });
  },
};

export default customerRepository;
