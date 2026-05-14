import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
declare global {
  namespace Express {
    interface Request {
      user?: string | JwtPayload;
    }
  }
}
const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized , Access denied",
      });
    }
    const token = authHeader.replace("Bearer ", "");
    const decoded = jwt.verify(token, config.secret as string);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};

export default authMiddleware;
