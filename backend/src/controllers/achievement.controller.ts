import {
  getAllAchievement,
  createAchievement,
  updateAchievement,
  deleteAchievement,
} from "../services/achievement.service.js";
import type { Request, Response } from "express";

export async function index(_req: Request, res: Response) {
  try {
    const result = await getAllAchievement();

    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
    });
  }
}

export async function store(req: Request, res: Response) {
  try {
    const { fullname, ranking, description, image } = req.body;
    const result = await createAchievement({
      fullname,
      ranking: Number(ranking),
      description,
      image,
    });

    res.status(201).json({
      data: {
        fullname: result.fullname,
        ranking: result.ranking,
        description: result.description,
        image: result.image,
      },
    });
  } catch (error: any) {
    // res.status(500).json({
    //   error: error.message
    // })
    console.error(error); // LIHAT TERMINAL LAZYVIM KAMU
    res.status(500).json({
      message: "Gagal simpan data",
      detail: error.code, // Kode error Prisma (misal: P2002, P2003)
    });
  }
}

export async function update(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const data = req.body;
    const result = await updateAchievement(id as string, data);
    res.status(200).json({
      where: { id },
      data: {
        data: result,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
    });
  }
}

export async function destroy(req: Request, res: Response) {
  try {
    const { id } = req.params;
    await deleteAchievement(id as string);
    res.status(200).json({
      message: "Data berhasil dihapus bro !",
    });
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
    });
  }
}
