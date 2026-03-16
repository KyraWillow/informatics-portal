import { prisma } from "../config/db.config.js";
import { AppError } from "../middlewares/error.middleware.js";
import type {
  Division,
  DivisionCreate,
  DivisionUpdate,
  DivisionWithMembers,
} from "../models/division.model.js";

export async function getAllDivisions(): Promise<Division[]> {
  const data = await prisma.division.findMany();
  return data;
}

export async function getDivisionWithMembers(
  id: string,
): Promise<DivisionWithMembers> {
  const data = await prisma.division.findUnique({
    where: { id },
    include: {
      members: true,
    },
  });

  if (!data) {
    throw new Error("Data division tidak ditemukan");
  }

  return data;
}

export async function createDivision(data: DivisionCreate): Promise<Division> {
  const checkData = await prisma.division.findFirst({
    where: { name: data.name },
  });

  if (checkData) {
    throw new AppError("Division with this title already exists", 409);
  }

  const newData = await prisma.division.create({
    data: {
      name: data.name,
      description: data.description,
      image: data.image,
    },
  });
  return newData;
}

export async function updateDivision(
  id: string,
  data: DivisionUpdate,
): Promise<Division> {
  const checkData = await prisma.division.findFirst({
    where: { id: id },
  });

  if (!checkData) {
    throw new AppError("Division not found", 404);
  }

  const updateData = await prisma.division.update({
    where: { id },
    data: data,
  });
  return updateData;
}

export async function deleteDivision(id: string): Promise<void> {
  const checkData = await prisma.division.findFirst({
    where: { id: id },
  });

  if (!checkData) {
    throw new AppError("Division not found", 404);
  }

  await prisma.division.delete({
    where: { id },
  });
}
