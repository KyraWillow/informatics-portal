import type { Request, Response, NextFunction } from "express";
import {
  getAllMeeting,
  getMeetingWithAttendance,
  createMeeting,
  updateMeeting,
  deleteMeeting,
} from "../services/meeting.service.js";

export async function index(_req: Request, res: Response, next: NextFunction) {
  try {
    const result = await getAllMeeting();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function showMeetingWithAttendance(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) {
  try {
    const { id } = req.params;
    const result = await getMeetingWithAttendance(id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function store(req: Request, res: Response, next: NextFunction) {
  try {
    const { title, description, location, link } = req.body;
    const result = await createMeeting({ title, description, location, link });
    res.status(200).json(result);
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
    const { title, description, location, link } = req.body;
    const result = await updateMeeting(id, {
      title,
      description,
      location,
      link,
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
    const result = await deleteMeeting(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}
