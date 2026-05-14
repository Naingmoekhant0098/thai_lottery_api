import bcrypt from "bcryptjs";

import { AuthRequest } from "./auth.type";
import jwt from "jsonwebtoken";
import config from "../../config";
import authRepository from "./auth.repository";
const authService = {
  async login(data: AuthRequest) {
    const user = await authRepository.findUserByPhone(data);
    console.log(data.password)
 
    if (!user) {
      throw new Error("Invalid phone number or password");
    }

    if (!user.password) {
      throw new Error("Password not set for this account");
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    console.log(isPasswordValid)

    if (!isPasswordValid) {
      throw new Error("Invalid phone number or password");
    }

    const token = jwt.sign(
      {
        userId: user.id,
        phone: user.phone,
      },
      config.secret as string,
      {
        expiresIn: "15d",
      }
    );

    const { password, ...safeUser } = user;

    return {
      user: safeUser,
      token,
    };
  },
  async me(userId: string) {
    const user = await authRepository.findUserById(userId);
    if (!user) {
      throw new Error("Invalid phone Number or password");
    }
    return user;
  },
};
export default authService;
