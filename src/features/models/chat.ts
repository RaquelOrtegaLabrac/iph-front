import { User } from "./user";

export type Chat = {
  id: string;
  name: string;
  participants: Participant[];
  isActive:
  | 'yes'
  | 'no'
  owner: User;

};

export interface Participant {
  id: string;
  userName: string;
}
