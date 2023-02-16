import { AccountTransaction } from './account-transaction.model';

// Need to name these a little bit more verbose because I was running into problems with conflicting names from Microsoft's TS lib.dom.d.ts file.
export interface UserAccount {
  accountNumber: number;
  balance: number;
  transactions: AccountTransaction[];
}