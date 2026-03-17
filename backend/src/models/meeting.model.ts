import type { Attendance } from "./attendance.model.js";

export interface Meeting {
  id: string;
  title: string;
  description: string | null;
  location: string | null;
  link: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export type MeetingCreate = Omit<Meeting, "id" | "createdAt" | "updatedAt">;

export type MeetingUpdate = Partial<
  Omit<Meeting, "id" | "createdAt" | "updatedAt">
>;

export interface MeetingWithAttendances extends Meeting {
  attendances: Attendance[];
}
