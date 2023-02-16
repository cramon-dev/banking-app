import { Component, Input, OnInit } from '@angular/core';
import { TransactionManagerService } from 'src/services/transaction-manager.service';
import { UserAccount } from '../../models/user-account.model';


// TODO - If continuing to go down the route of displaying transactions in-line with the account, consider altering the change detection strategy.
// OnPush would let us not have to worry about one of these account-info components kicking off change detection for other account-info components.
@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.css']
})
export class AccountInfoComponent {
  // For the sake of time, I need to add the non-null operator otherwise TS blows up in my face. It's messy and I would not normally do this.
  @Input() account!: UserAccount;

  // TODO - Ideally, implement injection token here so that we could provide anything that fits the form of TransactionManagerService rather than sticking to the service itself.
  constructor(transactionManager: TransactionManagerService) { }

  public get accountBalance() {
    return this.account.transactions.reduce((total, transaction) => {
      total += transaction.amount;
      return total;
    }, 0); // TODO - Accounts can't have less than $100.
  }

  applyTransaction(): void {

  }
}
