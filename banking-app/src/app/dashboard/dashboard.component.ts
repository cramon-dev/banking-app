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

  public get formTouched() {
    return this.accountForm.touched;
  }

  // The dashboard component shouldn't be the one to create an account or a transaction.
  // Really it should be up to another service.
  create(): void {
    // I don't like to use alerts but this works for now.
    // Ideally I would implement error states in the template to show the user in a non-intrusive way that they need to input a valid amount.
    if (this.accountForm.getError('invalidAmount')) {
      alert('Please deposit at least $100.');
      return;
    }

    const value = this.accountForm.get('initialAmount')?.value;
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
