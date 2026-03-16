import { prisma } from "../config/db.config.js";
import { AppError } from "../middlewares/error.middleware.js";
import type {
  Member,
  MemberWithDivision,
  MemberWithAttendance,
  MemberCreate,
  MemberUpdate,
} from "../models/member.model.js";

export async function getAllMember(): Promise<Member[]> {
  const data = await prisma.member.findMany();
  return data;
}

export async function getMemberWithDivision(
  id: string,
): Promise<MemberWithDivision> {
  const data = await prisma.member.findUnique({
    where: { id },
    include: {
      division: true,
    },
  });

  if (!data) {
    throw new AppError("Data member tidak ditemukan", 404);
  }

  return data;
}

export async function getMemberWithAttendance(
  id: string,
): Promise<MemberWithAttendance> {
  const data = await prisma.member.findUnique({
    where: { id },
    include: {
      attendances: true,
    },
  });

  if (!data) {
    throw new AppError("Data member tidak ditemukan", 404);
  }

  return data;
}

export async function createMember(data: MemberCreate): Promise<Member> {
  const checkData = await prisma.member.findFirst({
    where: { nim: data.nim },
  });

  if (checkData) {
    throw new AppError("Member with this title already exists", 409);
  }

  const newData = await prisma.member.create({
    data: {
      name: data.name,
      nim: data.nim,
      position: data.position,
      divisionId: data.divisionId,
      image: data.image,
    },
  });
  return newData;
}

export async function updateMember(
  id: string,
  data: MemberUpdate,
): Promise<Member> {
  const checkData = await prisma.member.findFirst({
    where: { id: id },
  });

  if (!checkData) {
    throw new AppError("Member not found", 404);
  }

  const updateData = await prisma.member.update({
    where: { id },
    data: data,
  });
  return updateData;
}

export async function deleteMember(id: string): Promise<void> {
  const checkData = await prisma.member.findFirst({
    where: { id: id },
  });

  if (!checkData) {
    throw new AppError("Member not found", 404);
  }

  await prisma.member.delete({
    where: { id },
  });
}
