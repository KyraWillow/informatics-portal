import type { Member } from "./member.model.js";

export interface Division {
  id: string;
  name: string;
  description: string;
  image: string | null;
}

export interface DivisionWithMembers extends Division {
  members: Member[];
}

export type DivisionCreate = Omit<Division, "id">;
export type DivisionUpdate = Partial<Omit<Division, "id">>;
