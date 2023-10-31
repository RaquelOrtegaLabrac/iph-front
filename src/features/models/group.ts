export type Group = {
  id: string;
  name: string;
  terminals: EachTerminal[];
};

export interface EachTerminal {
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
}
