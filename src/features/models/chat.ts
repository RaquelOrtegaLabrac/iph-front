
export type Chat = {
  id: string;
  name: string;
  participants: Participant[];
  isActive:
  | 'yes'
  | 'no'
};

export interface Participant {
  id: string;
  userName: string;
}
