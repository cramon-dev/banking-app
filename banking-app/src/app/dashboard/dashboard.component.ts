import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Guid } from 'js-guid';
import { User } from 'src/models/user.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @Input() user!: User;
  initialAmount!: FormControl;

  private accountNumberCounter = 1;

  constructor() { }

  public get hasAccounts() {
    return this.user.accounts.length > 0;
  }

  ngOnInit(): void {
    this.initialAmount = new FormControl(0, Validators.required);
  }

  // The dashboard component shouldn't be the one to create an account or a transaction.
  // Really it should be up to another service.
  create(): void {
    // TODO - Get the value from the form.
    const value = 100;
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
}
