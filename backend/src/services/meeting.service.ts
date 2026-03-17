import { describe } from "node:test";
import { prisma } from "../config/db.config.js";
import { AppError } from "../middlewares/error.middleware.js";
import type {
  Meeting,
  MeetingCreate,
  MeetingUpdate,
  MeetingWithAttendances,
} from "../models/meeting.model.js";

export async function getAllMeeting(): Promise<Meeting[]> {
  const data = await prisma.meeting.findMany();
  return data;
}

export async function getMeetingWithAttendance(id: string): Promise<Meeting> {
  const data = await prisma.meeting.findUnique({
    where: { id },
    include: {
      attendances: true,
    },
  });

  if (!data) {
    throw new AppError("Data meeting tidak ditemukan", 404);
  }
  return data;
}

export async function createMeeting(data: MeetingCreate): Promise<Meeting> {
  const checkData = await prisma.meeting.findFirst({
    where: { title: data.title },
  });

  if (checkData) {
    throw new AppError("Meeting dengan judul tersebut sudah ada", 400);
  }

  const newData = await prisma.meeting.create({
    data: {
      title: data.title,
      description: data.description,
      location: data.location,
      link: data.link,
    },
  });
  return newData;
}

export async function updateMeeting(
  id: string,
  data: MeetingUpdate,
): Promise<Meeting> {
  const checkData = await prisma.meeting.findFirst({
    where: { id: id },
  });

  if (!checkData) {
    throw new AppError("Meeting dengan id tersebut tidak ditemukan", 404);
  }

  const updateData = await prisma.meeting.update({
    where: { id },
    data: data,
  });
  return updateData;
}

export async function deleteMeeting(id: string): Promise<void> {
  const checkData = await prisma.meeting.findFirst({
    where: { id: id },
  });

  if (!checkData) {
    throw new AppError("Meeting dengan id tersebut tidak ditemuka", 404);
  }

  await prisma.meeting.delete({
    where: { id },
  });
}
