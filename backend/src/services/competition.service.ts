import { prisma } from "../config/db.config.js";
import { AppError } from "../middlewares/error.middleware.js";
import type {
  Competition,
  CompetitionCreate,
  CompetitionUpdate,
} from "../models/competition.model.js";

export async function getAllCompetitions(): Promise<Competition[]> {
  const data = await prisma.competition.findMany();

  if (!data) {
    throw new AppError("Data competition tidak ditemukan", 404);
  }

  return data;
}

export async function createCompetition(
  data: CompetitionCreate,
): Promise<Competition> {
  const newData = await prisma.competition.create({
    data: {
      title: data.title,
      description: data.description,
      link: data.link,
    },
  });

  if (!newData) {
    throw new AppError("Gagal membuat data competition", 500);
  }

  return newData;
}

export async function updateCompetition(
  id: string,
  data: CompetitionUpdate,
): Promise<Competition> {
  const updateData = await prisma.competition.update({
    where: { id },
    data: data,
  });

  if (!updateData) {
    throw new AppError("Gagal memperbarui data competition", 500);
  }

  return updateData;
}

export async function deleteCompetition(id: string): Promise<void> {
  const deleteData = await prisma.competition.delete({
    where: { id },
  });

  if (!deleteData) {
    throw new AppError("Gagal menghapus data competition", 500);
  }
}
