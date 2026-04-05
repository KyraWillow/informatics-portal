import { prisma } from "../config/db.config.js";
import { AppError } from "../middlewares/error.middleware.js";
import type {
  Attendance,
  AttendanceWithMember,
  AttendanceWithMeeting,
  AttendanceCreate,
  AttendanceUpdate,
} from "../models/attendance.model.js";

export async function getAllAttendances(): Promise<Attendance[]> {
  const data = await prisma.attendance.findMany();
  return data;
}

export async function getAllAttendancesByMeetingId(meetingId: string): Promise<Attendance[]> {
  const data = await prisma.attendance.findMany({
    where: { meetingId },
    include: { member: true },
  });
  return data;
}

export async function getAllAttendancesById(id: string): Promise<Attendance> {
  const data = await prisma.attendance.findFirst({
    where: { id },
  });

  if (!data) {
    throw new AppError("Attendance dengan id tersebut tidak ditemukan", 404);
  }

  return data;
}

export async function getAttendanceWithMember(
  id: string,
): Promise<AttendanceWithMember> {
  const data = await prisma.attendance.findUnique({
    where: { id },
    include: { member: true },
  });

  if (!data) {
    throw new AppError("Attendance dengan id tersebut tidak ditemukan", 404);
  }

  return data;
}

export async function getAttendanceWithMeeting(
  id: string,
): Promise<AttendanceWithMeeting> {
  const data = await prisma.attendance.findUnique({
    where: { id },
    include: { meeting: true },
  });

  if (!data) {
    throw new AppError("Attendance dengan id tersebut tidak ditemukan", 404);
  }

  return data;
}

export async function createAttendance(
  data: AttendanceCreate,
): Promise<Attendance> {
  const checkData = await prisma.attendance.findFirst({
    where: {
      memberId: data.memberId,
      meetingId: data.meetingId,
    },
  });

  if (checkData) {
    throw new AppError(
      "Attendance dengan memberId dan meetingId tersebut sudah ada",
      400,
    );
  }

  const newData = await prisma.attendance.create({
    data: {
      memberId: data.memberId,
      meetingId: data.meetingId,
      status: data.status,
    },
  });
  return newData;
}
