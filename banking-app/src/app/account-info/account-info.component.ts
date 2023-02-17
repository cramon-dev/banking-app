import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ResultType, TransactionResult } from 'src/models/transaction-result.model';
import { TransactionManagerService } from 'src/services/transaction-manager.service';
import { UserAccount } from '../../models/user-account.model';
import { validateAmount } from '../shared/validate-amount';


// TODO - If continuing to go down the route of displaying transactions in-line with the account, consider altering the change detection strategy.
// OnPush would let us not have to worry about one of these account-info components kicking off change detection for other account-info components.
@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.css']
})
export class AccountInfoComponent {
  // I know this form shares similarities with the create account form in the dashboard component.
  // Ideally I'd like to create a base, abstract class for this form and then simply have dashboard and account-info extend that base.
  transactionForm = new FormGroup({
    amount: new FormControl(0, [Validators.required, validateAmount])
  });
  // For the sake of time, I need to add the non-null operator otherwise TS blows up in my face. It's messy and I would not normally do this.
  @Input() account!: UserAccount;
  @Output() delete: EventEmitter<number> = new EventEmitter();

  private transactionManager: TransactionManagerService;

  // TODO - Move this to some base form component so that this doesn't need to live in this component. Hard to maintain this and other props otherwise.
  public get formTouched() {
    return this.transactionForm.touched;
  }

  public get inputtedAmount() {
    return this.transactionForm.get('amount');
  }

  // TODO - Ideally, implement injection token here so that we could provide anything that fits the form of TransactionManagerService rather than sticking to the service itself.
  constructor(transactionManager: TransactionManagerService) {
    this.transactionManager = transactionManager;
  }

  applyTransaction(amount: number) {
    const result = this.transactionManager.applyTransaction(this.account, amount);

    switch(result.type) {
      case ResultType.FAILURE:
        // Really messy but I've been having trouble with the form recognizing this error structure.
        if (result.reason.withdrawal) {
          alert('Withdrawals can\'t exceed 90% of your account balance or leave you with less than $100 in your account.');
          return;
        }
        this.transactionForm.setErrors(result.reason);
        break;
      case ResultType.SUCCESS:
        this.transactionForm.reset();
        break;
      default:
        break;
    }
  }

  // I know the logic shouldn't be duplicated, but I couldn't think of something on the fly to implement withdraw & deposit separately.
  deposit(): void {
    this.applyTransaction(this.transactionForm.get('amount')?.value);
  }

  withdraw(): void {
    // Not proud of this.
    this.applyTransaction(-(this.transactionForm.get('amount')?.value));
  }
}
