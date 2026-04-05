import {
  getAllDivisions,
  getDivisionWithMembers,
  createDivision,
  updateDivision,
  deleteDivision,
} from "../services/division.service.js";
import type { Request, Response, NextFunction } from "express";

export async function index(_req: Request, res: Response, next: NextFunction) {
  try {
    const result = await getAllDivisions();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function showWithMembers(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) {
  try {
    const { id } = req.params;
    const result = await getDivisionWithMembers(id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function showWithMembersPublic(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) {
  try {
    const { id } = req.params;
    const result = await getDivisionWithMembers(id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function store(req: Request, res: Response, next: NextFunction) {
  try {
    const { name, description, image } = req.body;
    const result = await createDivision({ name, description, image });
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
    const data = req.body;
    const result = await updateDivision(id, data);
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
    await deleteDivision(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}
