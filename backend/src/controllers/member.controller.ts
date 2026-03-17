import type { Request, Response, NextFunction } from "express";
import {
  getAllMember,
  getMemberWithDivision,
  getMemberWithAttendance,
  createMember,
  updateMember,
  deleteMember,
} from "../services/member.service.js";

export async function index(_req: Request, res: Response, next: NextFunction) {
  try {
    const result = await getAllMember();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function showWithDivision(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) {
  try {
    const { id } = req.params;
    const result = await getMemberWithDivision(id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function showWithAttendance(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) {
  try {
    const { id } = req.params;
    const result = await getMemberWithAttendance(id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function store(req: Request, res: Response, next: NextFunction) {
  try {
    const { name, nim, position, divisionId, image } = req.body;
    const result = await createMember({
      name,
      nim,
      position,
      divisionId,
      image,
    });
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
    const { name, nim, position, divisionId, image } = req.body;
    const result = await updateMember(id, {
      name,
      nim,
      position,
      divisionId,
      image,
    });
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
    await deleteMember(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}
