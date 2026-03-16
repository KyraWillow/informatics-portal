import { prisma } from "../config/db.config.js";
import { AppError } from "../middlewares/error.middleware.js";
import type {
  Competition,
  CompetitionCreate,
  CompetitionUpdate,
} from "../models/competition.model.js";

export async function getAllCompetitions(): Promise<Competition[]> {
  const data = await prisma.competition.findMany();
  return data;
}

export async function createCompetition(
  data: CompetitionCreate,
): Promise<Competition> {
  const checkData = await prisma.competition.findFirst({
    where: { title: data.title },
  });

  if (checkData) {
    throw new AppError("Competition with this title already exists", 409);
  }

  const newData = await prisma.competition.create({
    data: {
      title: data.title,
      description: data.description,
      link: data.link,
    },
  });
  return newData;
}

export async function updateCompetition(
  id: string,
  data: CompetitionUpdate,
): Promise<Competition> {
  const checkData = await prisma.competition.findFirst({
    where: { id: id },
  });

  if (!checkData) {
    throw new AppError("Competition not found", 404);
  }

  const updateData = await prisma.competition.update({
    where: { id },
    data: data,
  });
  return updateData;
}

export async function deleteCompetition(id: string): Promise<void> {
  const checkData = await prisma.competition.findFirst({
    where: { id: id },
  });

  if (!checkData) {
    throw new AppError("Competition not found", 404);
  }

  await prisma.competition.delete({
    where: { id },
  });
}
