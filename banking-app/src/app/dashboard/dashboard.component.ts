import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Guid } from 'js-guid';
import { User } from 'src/models/user.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  @Input() user!: User;
  accountForm: FormGroup = new FormGroup({
    initialAmount: new FormControl(0, [Validators.required, this.validateAmount])
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
    if (value < 100) {
      
    }
    this.user.accounts.push({
      accountNumber: this.accountNumberCounter,
      balance: value,
      transactions: [{
        id: Guid.newGuid.toString(),
        amount: value,
        date: new Date()
      }]
    });
  }

  // TODO - Move this out of this component. Should probably be in a utility folder like we would for custom pipes.
  validateAmount(control: AbstractControl) {
    if (control.value < 100) {
      return { invalidAmount: true }
    }

    return null;
  }

  delete(accountNumber: number): void {
    this.user.accounts = this.user.accounts.filter((account) => account.accountNumber !== accountNumber);
  }
}
