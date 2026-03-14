import { prisma } from "../config/db.config.js";
import type { Achievement } from "../models/achievement.model.js";

export async function getAllAchievement() {
  const data = await prisma.achievement.findMany()

  if (!data) {
    throw new Error("Data untuk saat ini masih kosong bro !")
  }

  return data
}

export async function createAchievement(data: Achievement) {
  const newData = await prisma.achievement.create({
    data: {
      fullname: data.fullname,
      ranking: data.ranking,
      description: data.description,
      image: data.image,
    }
  })

  if (!newData) {
    throw new Error("Masukkan data yang valid bro !")
  }

  return newData
}

export async function updateAchievement(id: string, data: Partial<Achievement>) {
  const updateData = await prisma.achievement.update({
    where: { id },
    data: data
  })

  if (!updateData) {
    throw new Error("Data tidak ditemukan & tidak dapat mengupdatenya")
  }

  return updateData
}

export async function deleteAchievement(id: string) {
  const deleteData = await prisma.achievement.delete({
    where: { id }
  })

  if (!deleteData) {
    throw new Error("Data tidak ditemukan & tidak dapat menghapusnya")
  }
}
