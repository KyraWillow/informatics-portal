import type { Division } from "./division.model.js";
import type { Attendance } from "./attendance.model.js";

export interface Member {
  id: string;
  name: string;
  nim: string;
  position: string;
  image: string | null;
  divisionId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface MemberWithDivision extends Member {
  division: Division | null;
}

export interface MemberWithAttendance extends Member {
  attendances: Attendance[];
}

export type MemberCreate = Omit<Member, "id" | "createdAt" | "updatedAt">;

export type MemberUpdate = Partial<
  Omit<Member, "id" | "createdAt" | "updatedAt">
>;
