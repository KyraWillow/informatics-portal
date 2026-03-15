import type { Request, Response, NextFunction } from "express";
import {
  getAllCompetitions,
  createCompetition,
  updateCompetition,
  deleteCompetition,
} from "../services/competition.service.js";

export async function index(_req: Request, res: Response, next: NextFunction) {
  try {
    const result = await getAllCompetitions();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function store(req: Request, res: Response, next: NextFunction) {
  try {
    const { title, description, link } = req.body;
    const result = await createCompetition({ title, description, link });
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

export async function update(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) {
  try {
    const { id } = req.params;
    const { title, description, link } = req.body;
    const result = await updateCompetition(id, { title, description, link });
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}
export async function destroy(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) {
  try {
    const { id } = req.params;
    await deleteCompetition(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}
