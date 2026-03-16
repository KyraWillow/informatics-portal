import { prisma } from "../config/db.config.js";
import { AppError } from "../middlewares/error.middleware.js";
import type { Achievement } from "../models/achievement.model.js";

export async function getAllAchievement() {
  const data = await prisma.achievement.findMany();
  return data;
}

export async function createAchievement(data: Achievement) {
  const checkData = await prisma.achievement.findFirst({
    where: { fullname: data.fullname },
  });

  if (checkData) {
    throw new AppError("Achievement with this title already exists", 409);
  }

  const newData = await prisma.achievement.create({
    data: {
      fullname: data.fullname,
      ranking: data.ranking,
      description: data.description,
      image: data.image,
    },
  });
  return newData;
}

export async function updateAchievement(
  id: string,
  data: Partial<Achievement>,
) {
  const checkData = await prisma.achievement.findFirst({
    where: { id: id },
  });

  if (!checkData) {
    throw new AppError("Achievement not found", 404);
  }

  const updateData = await prisma.achievement.update({
    where: { id },
    data: data,
  });
  return updateData;
}

export async function deleteAchievement(id: string) {
  const checkData = await prisma.achievement.findFirst({
    where: { id: id },
  });

  if (!checkData) {
    throw new AppError("Achievement not found", 404);
  }

  await prisma.achievement.delete({
    where: { id },
  });
}
