import { prisma } from "../config/db.config.js";
import type {
  Division,
  DivisionCreate,
  DivisionUpdate,
  DivisionWithMembers,
} from "../models/division.model.js";

export async function getAllDivisions(): Promise<Division[]> {
  const data = await prisma.division.findMany();

  if (!data) {
    throw new Error("Data untuk saat ini masih kosong bro !");
  }

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
  const newData = await prisma.division.create({
    data: {
      name: data.name,
      description: data.description,
      image: data.image,
    },
  });

  if (!newData) {
    throw new Error("Gagal membuat data Division");
  }

  return newData;
}

export async function updateDivision(
  id: string,
  data: DivisionUpdate,
): Promise<Division> {
  const updateData = await prisma.division.update({
    where: { id },
    data: data,
  });

  if (!updateData) {
    throw new Error("Gagal mengupdate data Divsion");
  }

  return updateData;
}

export async function deleteDivision(id: string): Promise<void> {
  const deleteData = await prisma.division.delete({
    where: { id },
  });

  if (!deleteData) {
    throw new Error("Gagal menghapus data Division");
  }
}
