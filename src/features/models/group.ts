import { User } from "./user";

export type Group = {
  id: string;
  name: string;
  terminals: Terminal[];
};

export interface Terminal {
  id: string;
  name: string;
  battery:
  | '0'
  | '10'
  | '20'
  | '30'
  | '40'
  | '50'
  | '60'
  | '70'
  | '80'
  | '90'
  | '100'
  wifiLevel:
  | 'none'
  | 'low'
  | 'medium'
  | 'high'
  isConnected: string;
  owner: User;

}
