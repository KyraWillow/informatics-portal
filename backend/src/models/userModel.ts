export interface User {
  username: string;
  password: string;
}

export type CreateUserInput = Omit<User, "id">;
