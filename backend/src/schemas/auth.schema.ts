import { z } from "zod";

export const AuthCreateSchema = z.object({
  username: z.string(),
  password: z.string(),
  role: z.enum(["admin", "user"]),
});
