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

  if (!data) {
    throw new AppError("Data Member saat ini masih kosong bro !", 404);
  }

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
  const newData = await prisma.member.create({
    data: {
      name: data.name,
      nim: data.nim,
      position: data.position,
      divisionId: data.divisionId,
      image: data.image,
    },
  });

  if (!newData) {
    throw new AppError("Gagal membuat  member", 500);
  }

  return newData;
}

export async function updateMember(
  id: string,
  data: MemberUpdate,
): Promise<Member> {
  const updateData = await prisma.member.update({
    where: { id },
    data: data,
  });

  if (!updateData) {
    throw new AppError("Gagal mengupdate member", 500);
  }

  return updateData;
}

export async function deleteMember(id: string): Promise<void> {
  const deleteData = await prisma.member.delete({
    where: { id },
  });

  if (!deleteData) {
    throw new AppError("Gagal menghapus member", 500);
  }
}
