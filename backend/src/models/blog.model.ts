export interface Blog {
  id: string;
  title: string;
  content: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

export type BlogCreate = Omit<Blog, "id" | "createdAt" | "updatedAt">;
export type BlogUpdate = Partial<Omit<Blog, "id" | "createdAt" | "updatedAt">>;
