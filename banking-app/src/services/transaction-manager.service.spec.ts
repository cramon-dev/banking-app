import { TestBed } from '@angular/core/testing';
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
      transactions: []
    } as UserAccount;
    service.applyTransaction(account, 100);

    expect(account.transactions.length).toEqual(1);
    expect(account.transactions[0].amount).toEqual(100);
  });
});
