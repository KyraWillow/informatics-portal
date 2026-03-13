import jwt, { type JwtPayload } from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";
import { jwtConfig } from "../config/jwt.config.js";

export async function AuthMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Tidak ada token yang diberikan" });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decode = jwt.verify(token as string, jwtConfig.secret);
    (req as any).user = decode as JwtPayload;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token tidak valid" });
  }
}
