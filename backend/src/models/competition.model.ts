export interface Competition {
  id: string;
  title: string;
  description: string;
  link: string;
  createdAt: Date;
  updatedAt: Date;
}

export type CompetitionCreate = Omit<
  Competition,
  "id" | "createdAt" | "updatedAt"
>;

export type CompetitionUpdate = Partial<
  Omit<Competition, "id" | "createdAt" | "updatedAt">
>;
