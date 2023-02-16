import { Injectable } from '@angular/core';
import { Guid } from 'js-guid';
import { UserAccount } from '../models/user-account.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionManagerService {
  constructor() { }

  // I think this should ideally return something.
  // Assuming we're straying from happy path: what if a transaction fails?
  applyTransaction(account: UserAccount, amount: number): void {
    const accountBalance = account.transactions.reduce((total, transaction) => {
      total += transaction.amount;
      return total;
    }, 0);

    account.transactions.push({
      id: Guid.newGuid().toString(),
      amount: amount,
      date: new Date()
    });
  }
}
