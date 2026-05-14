import { prisma } from "../../../prisma/client";

const lotteryDrawRepository = {
  async createLotteryDraw(data: any) {
    return await prisma.lotteryDraw.create({
      data: {
        ...data,
        // Ensure dates are handled as Date objects if they come in as strings
        drawDate: data.drawDate ? new Date(data.drawDate) : undefined,
        expireDate: data.expireDate ? new Date(data.expireDate) : undefined,
      },
    });
  },

  async getLotteryDrawByDate(date: Date) {
    try {
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);
  
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);

      const today = new Date();
      today.setHours(0, 0, 0, 0);
  
      
      const isFutureDate = startOfDay.getTime() > today.getTime();
  
      
      const draw = await prisma.lotteryDraw.findFirst({
        where: {
          drawDate: {
            gte: startOfDay,
            lte: endOfDay,
          },
        },
      });
  
      return {
        draw,          
        isFutureDate   
      };
    } catch (error) {
      console.error("Error fetching draw by date:", error);
      throw new Error("Could not fetch lottery draw by date");
    }
  },
  async getLotteryDrawById(id: string) {
    return await prisma.lotteryDraw.findUnique({
      where: { id },
      include: {
        _count: {
          select: { tickets: true },
        },
      },
    });
  },

  async getAllLotteryDraws() {
    return await prisma.lotteryDraw.findMany({
      orderBy: { drawDate: "asc" },
    });
  },

  async getLotteryDrawsWithPagination(params?: any) {
    const page = Number(params?.page) || 1;
    const limit = Number(params?.limit) || 10;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (params?.search) {
      where.externalId = {
        contains: params.search,
      };
    }
    if (params?.status) {
      where.status = params.status;
    }
    if (params?.date) {
      const start = new Date(params.date);
      const end = new Date(params.date);
      start.setUTCHours(0, 0, 0, 0);
      end.setUTCHours(23, 59, 59, 999);
      where.drawDate = { gte: start, lte: end };
    }
    const [draws, total] = await Promise.all([
      prisma.lotteryDraw.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          drawDate: "asc",
        },
        include : {
          tickets : true
        }
      }),
      prisma.lotteryDraw.count({ where }),
    ]);

    return {
      data: draws,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit) || 1,
      },
    };
  },

  async upsertLotteryDraw(externalId: string, data: any) {
    return await prisma.lotteryDraw.upsert({
      where: { externalId: externalId }, 
      update: {
        results: data.results,
        status: data.status,
        isClosed: data.isClosed,
      },
      create: {
        ...data,
        externalId: externalId,
      },
    });
  }

  ,

  async updateLotteryDraw(id: string, data: any) {
    return await prisma.lotteryDraw.update({
      where: { id },
      data: {
        ...data,
        drawDate: data.drawDate ? new Date(data.drawDate) : undefined,
        expireDate: data.expireDate ? new Date(data.expireDate) : undefined,
      },
    });
  },

  async deleteLotteryDraw(id: string) {
    return await prisma.lotteryDraw.delete({
      where: { id },
    });
  },
};

export default lotteryDrawRepository;
