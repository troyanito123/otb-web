export interface Report {
  id: number;
  amount: number;
  description: string;
  date: string;
  fromUser: string;
  toUser?: string;
}
