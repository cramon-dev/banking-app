import { TestBed } from '@angular/core/testing';
import { ResultType, TransactionResult } from 'src/models/transaction-result.model';
import { UserAccount } from 'src/models/user-account.model';

import { TransactionManagerService } from './transaction-manager.service';

describe('TransactionManagerService', () => {
  let service: TransactionManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransactionManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a transaction to a provided account', () => {
    const account = {
      accountNumber: 100,
      balance: 100,
      transactions: [
        { id: '1234-ABCD', amount: 100 } // Initial seed
      ]
    } as UserAccount;
    const result = service.applyTransaction(account, 100);

    expect(account.transactions.length).toEqual(2);
    expect(account.transactions[1].amount).toEqual(100);
    expect(account.balance).toEqual(200);
    expect(result.type).toEqual(ResultType.SUCCESS);
  });

  it('should not add a transaction to a provided account if the amount exceeds $10,000', () => {
    const account = {
      accountNumber: 100,
      balance: 100,
      transactions: [
        { id: '1234-ABCD', amount: 100 }
      ]
    } as UserAccount;
    const result = service.applyTransaction(account, 100000);

    expect(account.transactions.length).toEqual(1);
    expect(account.balance).toEqual(100);
    expect(result.type).toEqual(ResultType.FAILURE);
    expect(result.reason).toEqual({ deposit: { tooMuch: true }});
  });

  it('should not add a transaction to a provided account if the withdrawn amount exceeds 90% of its original balance', () => {
    const account = {
      accountNumber: 100,
      balance: 1500,
      transactions: [
        { id: '1234-ABCD', amount: 1500 }
      ]
    } as UserAccount;
    const result = service.applyTransaction(account, -1400);

    expect(account.transactions.length).toEqual(1);
    expect(account.balance).toEqual(1500);
    expect(result.reason).toEqual({ withdrawal: { tooMuch: true }});
  });

  it('should not add a transaction to a provided account if the withdrawn amount exceeds its original balance', () => {
    const account = {
      accountNumber: 100,
      balance: 1500,
      transactions: [
        { id: '1234-ABCD', amount: 1500 }
      ]
    } as UserAccount;
    const result = service.applyTransaction(account, -14000);

    expect(account.transactions.length).toEqual(1);
    expect(account.balance).toEqual(1500);
    expect(result.reason).toEqual({ withdrawal: { tooMuch: true }});
  });
});
