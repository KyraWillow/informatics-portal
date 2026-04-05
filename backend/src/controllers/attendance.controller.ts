import type { Request, Response, NextFunction } from "express";
import {
  getAllAttendances,
  getAllAttendancesById,
  getAllAttendancesByMeetingId,
  getAttendanceWithMeeting,
  getAttendanceWithMember,
  createAttendance,
} from "../services/attendance.service.js";

export async function index(_req: Request, res: Response, next: NextFunction) {
  try {
    const result = await getAllAttendances();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function showAttendanceById(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) {
  try {
    const { id } = req.params;
    const result = await getAllAttendancesById(id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function showAttendanceWithMember(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) {
  try {
    const { id } = req.params;
    const result = await getAllAttendancesById(id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function showAttendanceWithMeeting(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) {
  try {
    const { id } = req.params; // ini adalah meetingId
    const result = await getAllAttendancesByMeetingId(id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function store(req: Request, res: Response, next: NextFunction) {
  try {
    const { memberId, meetingId, status } = req.body;
    const result = await createAttendance({ memberId, meetingId, status });
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}
