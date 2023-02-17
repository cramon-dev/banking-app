import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Guid } from 'js-guid';
import { User } from 'src/models/user.model';
import { validateAmount } from '../shared/validate-amount';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  @Input() user!: User;
  accountForm: FormGroup = new FormGroup({
    amount: new FormControl(0, [Validators.required, validateAmount])
  });

  private accountNumberCounter = 1;

  constructor() { }

  public get hasAccounts() {
    return this.user.accounts.length > 0;
  }


  public get inputtedAmount() {
    return this.accountForm.get('amount');
  }

  // TODO - Move this to some base form component so that this doesn't need to live in this component. Hard to maintain this and other props otherwise.
  public get formTouched() {
    return this.accountForm.touched;
  }

  // The dashboard component shouldn't be the one to create an account or a transaction.
  // Really it should be up to another service.
  create(): void {
    const value = this.accountForm.get('amount')?.value;
    this.user.accounts.push({
      accountNumber: this.accountNumberCounter++, // Messy, I know. Ideally some other entity should keep track of this so there's no possible conflict.
      balance: value,
      transactions: [{
        id: Guid.newGuid.toString(),
        amount: value,
        date: new Date()
      }]
    });

    this.accountForm.reset();
  }

  delete(accountNumber: number): void {
    this.user.accounts = this.user.accounts.filter((account) => account.accountNumber !== accountNumber);
  }
}
