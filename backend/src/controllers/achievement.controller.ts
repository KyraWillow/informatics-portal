import {
  getAllAchievement,
  createAchievement,
  updateAchievement,
  deleteAchievement,
} from "../services/achievement.service.js";
import type { Request, Response, NextFunction } from "express";

export async function index(_req: Request, res: Response, next: NextFunction) {
  try {
    const result = await getAllAchievement();

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function store(req: Request, res: Response, next: NextFunction) {
  try {
    const { fullname, ranking, description, image } = req.body;
    const result = await createAchievement({
      fullname,
      ranking: Number(ranking),
      description,
      image,
    });

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const data = req.body;
    const result = await updateAchievement(id as string, data);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function destroy(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    await deleteAchievement(id as string);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}
