import { UserAccount } from './user-account.model';

export interface User {
  id: number;
  name: string;
  accounts: UserAccount[];
}