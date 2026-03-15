import type { Attendance } from "./attendance.model.js";

export interface Meeting {
  id: string;
  title: string;
  description: string | null;
  location: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface MeetingWithAttendances extends Meeting {
  attendances: Attendance[];
}
