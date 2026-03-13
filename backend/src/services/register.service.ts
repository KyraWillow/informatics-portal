import { prisma } from "../config/db.config.js";
import { type User } from "../models/userModel.js";
import bcrypt from "bcrypt";

export async function RegisterUser(user: User) {
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
