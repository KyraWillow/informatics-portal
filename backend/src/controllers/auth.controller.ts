import { RegisterUser, LoginUser } from "../services/auth.service.js";
import type { Request, Response } from "express";

export async function RegisterController(req: Request, res: Response) {
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

export async function LoginController(req: Request, res: Response) {
  try {
    const { username, password } = req.body;
    const user = await LoginUser({ username, password });
    res.status(200).json({
      user,
    });
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
    });
  }
}
