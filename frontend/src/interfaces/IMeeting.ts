import { UserFrequency } from './IUser';

export interface Meeting {
  id: number;
  date: string;
  groupId: number;
  created_at: string;
  updated_at: string;
  groupName: string;
  users: UserFrequency[];
}
