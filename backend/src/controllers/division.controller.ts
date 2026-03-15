import {
  getAllDivisions,
  getDivisionWithMembers,
  createDivision,
  updateDivision,
  deleteDivision,
} from "../services/division.service.js";
import type { Request, Response } from "express";

export async function index(_req: Request, res: Response) {
  try {
    const result = await getAllDivisions();
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export async function showWithMembers(
  req: Request<{ id: string }>,
  res: Response,
) {
  try {
    const { id } = req.params;
    const result = await getDivisionWithMembers(id);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export async function store(req: Request, res: Response) {
  try {
    const { name, description, image } = req.body;
    const result = await createDivision({ name, description, image });
    res.status(201).json({
      data: {
        name: result.name,
        description: result.description,
        image: result.image,
      },
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export async function update(req: Request<{ id: string }>, res: Response) {
  try {
    const { id } = req.params;
    const data = req.body;
    const result = await updateDivision(id, data);
    res.status(200).json({
      where: { id },
      data: {
        data: result,
      },
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
export async function destroy(req: Request<{ id: string }>, res: Response) {
  try {
    const { id } = req.params;
    await deleteDivision(id);
    res.status(200).json({ message: "Data berhasil dihapus bro !" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
