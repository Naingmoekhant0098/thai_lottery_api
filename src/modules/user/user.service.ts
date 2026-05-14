import bcrypt from "bcryptjs";
import userRepository from "./user.repository";
import { RequestUserType } from "./user.type";

const userService = {
  async createUser(data: any) {
    const hashed = await bcrypt.hash(data.password, 10);
    return userRepository.createUserRepo({
      ...data,
      password: hashed,
    });
  },
  async getUsers() {
    return userRepository.getUsersRepo();
  },
  async getUserDetail(id: string) {
    try {
      const user = userRepository.getUserByIdRepo(id);
      if (!user) {
        throw new Error("User not found with the provided ID");
      }
      return user;
    } catch (error) {
      throw new Error("Failed to get user detail");
    }
  },
  async updateUser(id: string, data: RequestUserType) {
    try {
      const isUserExist = userRepository.getUserByIdRepo(id);
      if (!isUserExist) {
        throw new Error("User not found with the provided ID");
      }
      const user = userRepository.updateUserRepo(id, data);
      return user;
    } catch (error) {
      throw new Error("Failed to update user detail");
    }
  },

  async deleteUsers() {
    return userRepository.deleteAllUsersRepo();
  },
  async deleteUserById(id: string) {
    return userRepository.deleteUserRepo(id);
  },
};
export default userService;
