import { prisma } from "../../../prisma/client";

const userRepository = {
  createUserRepo: (data: any) => {
    return prisma.user.create({ data });
  },
  getUsersRepo: () => {
    return prisma.user.findMany({
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
  getUserByIdRepo: (userId: string) => {
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
  deleteUserRepo: (userId: string) => {
    return prisma.user.delete({ where: { id: userId } });
  },
  deleteAllUsersRepo: () => {
    return prisma.user.deleteMany();
  },
  updateUserRepo: (userId: string, data: any) => {
    return prisma.user.update({ where: { id: userId }, data });
  },
};

export default userRepository;
