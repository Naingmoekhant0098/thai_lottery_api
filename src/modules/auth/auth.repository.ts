import { prisma } from "../../../prisma/client";
import { AuthRequest } from "./auth.type";

const authRepository = {
  login: (data: any) => {
    return prisma.user.create({ data });
  },
  findUserByPhone: (data: AuthRequest) => {
    return prisma.user.findUnique({ where: { phone: data.phone } });
  },
  findUserByUserId: (userId: string) => {
    return prisma.user.findFirst({ where: { id: userId } });
  },
  findUserById: (userId: string) => {
    return prisma.user.findFirst({
      where: { id: userId },
      select: {
        password: false,
        id: true,
        phone: true,
        name: true,
        role: true,
        createdAt: true,
      },
    });
  },
};

export default authRepository;
