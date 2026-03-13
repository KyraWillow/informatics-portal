import { prisma } from "../config/db.config.js";
import type { CreateUserInput, User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { jwtConfig } from "../config/jwt.config.js";

export async function RegisterUser(user: CreateUserInput) {
  const existingUser = await prisma.user.findUnique({
    where: { username: user.username },
  });

  if (existingUser) {
    throw new Error("Username sudah digunakan bro !");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(user.password, salt);

  await prisma.user.create({
    data: {
      username: user.username,
      password: hashedPassword,
    },
  });

  return {
    username: user.username,
    message: "Akun berhasil dibuat bro !",
  };
}

export async function LoginUser(data: User) {
  const user = await prisma.user.findUnique({
    where: {
      username: data.username,
    },
  });

  if (!user) {
    throw new Error("User belum terdaftar bro !");
  }

  const isPasswordValid = await bcrypt.compare(data.password, user.password);

  if (!isPasswordValid) {
    throw new Error("Password salah bro !");
  }

  const token = jwt.sign(
    {
      id: user.id,
      username: user.username,
      role: user.role,
    },
    jwtConfig.secret,
    { expiresIn: jwtConfig.expiresIn as any },
  );

  return {
    user: user.username,
    token,
    message: "Login berhasil bro !",
  };
}
