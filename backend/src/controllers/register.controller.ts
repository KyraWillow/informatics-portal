import { RegisterUser } from "../services/register.service.js";
import type { Request, Response } from "express";

export async function RegisterUserController(req: Request, res: Response) {
  try {
    const { username, password } = req.body;
    const data = await RegisterUser({ username, password });
    res.status(201).json({
      data,
    });
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
    });
  }
}
