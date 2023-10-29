import { User } from "../../features/models/user";

export type LoginResponse = {
  token: string;
  user: User;
};
