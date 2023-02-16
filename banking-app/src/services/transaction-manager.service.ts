import { Injectable } from '@angular/core';
import { Guid } from 'js-guid';
import { TransactionResult } from 'src/models/transaction-result.model';
import { UserAccount } from '../models/user-account.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionManagerService {
  constructor() { }

  // When returning result, it's up to the consumer to show the result.
  // This function is messy and needs to be altered in such a way that it's not doing ALL of the work.
  applyTransaction(account: UserAccount, amount: number): TransactionResult {
    /*
      Rules
      1. Can't withdraw more than 90% of total balance at once.
      2. Can't deposit more than $10k at once.
      3. Balance can't be less than $100 at any time.
    */

    const newBalance = account.balance + amount;

    if (newBalance < 100) {
      return TransactionResult.FAILURE;
    }

    if (amount > 10000) {
      return TransactionResult.FAILURE;
    }

    // I know this doesn't take into account -0, that's pretty edge casey.
    if (amount < 0) {
      const percentage = (Math.abs(account.balance / amount) * 100);
      if (percentage > 90) {
        return TransactionResult.FAILURE;
      }
    }

    account.transactions.push({
      id: Guid.newGuid().toString(),
      amount: amount,
      date: new Date()
    });

    const accountBalance = account.transactions.reduce((total, transaction) => {
      total += transaction.amount;
      return total;
    }, 0);

    account.balance = accountBalance;

    return TransactionResult.SUCCESS;
  }
}
