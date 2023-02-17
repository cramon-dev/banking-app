import { Injectable } from '@angular/core';
import { Guid } from 'js-guid';
import { ResultType, TransactionResult } from 'src/models/transaction-result.model';
import { UserAccount } from '../models/user-account.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionManagerService {
  constructor() { }

  // When returning result, it's up to the consumer to show the result.
  // This function is very messy. This really should be altered in such a way that we're checking the deposit and withdrawal separately.
  // It's doing too much work, but I'm not really sure at the moment how best to split it up.
  applyTransaction(account: UserAccount, amount: number): TransactionResult {
    /*
      Rules
      1. Can't withdraw more than 90% of total balance at once.
      2. Can't deposit more than $10k at once.
      3. Balance can't be less than $100 at any time.
    */
    if (amount < 0) { 
      // I know this doesn't take into account if somebody tries funny business with -0, that's pretty edge casey.
      const percentage = (Math.abs(account.balance / amount) * 100);
      if ((percentage > 90)) {
        return { 
          type: ResultType.FAILURE,
          reason: { withdrawal: { tooMuch: true }}
        }
      }

      if ((account.balance + amount < 100)) {
        return { 
          type: ResultType.FAILURE,
          reason: { withdrawal: { tooMuch: true }}
        }
      }
    } else {
      const newBalance = account.balance + amount;

      if (newBalance < 100) {
        return {
          type: ResultType.FAILURE,
          reason: { deposit: { notEnough: true }}
        };
      }

      if (amount > 10000) {
        return {
          type: ResultType.FAILURE,
          reason: { deposit: { tooMuch: true }}
        }
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

    return { type: ResultType.SUCCESS };
  }
}
