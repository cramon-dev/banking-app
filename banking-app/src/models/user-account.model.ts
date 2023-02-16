import { AccountTransaction } from './account-transaction.model';

// Need to name these a little bit more verbose because I was running into problems with conflicting names from Microsoft's TS lib.dom.d.ts file.
export interface UserAccount {
  accountNumber: number;
  /*
    Proper solution in a small amount of time is not something I'm sure about right now.
    One way I think of doing this is adding up the sum amounts of transactions, but it's not scalable AT ALL (what if someone has hundreds or more of transactions, and that many accounts?).
    Maybe I'm overcomplicating this; maybe the account should just know its own balance as a property, but an outside source should only be able to modify it.
  */
  balance: number;
  transactions: AccountTransaction[];
}