import { Component, Input, OnInit } from '@angular/core';
import { UserAccount } from '../../models/user-account.model';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.css']
})
export class AccountInfoComponent implements OnInit {
  // For the sake of time, I need to add the non-null operator otherwise TS blows up in my face. It's messy and I would not normally do this.
  @Input() account!: UserAccount;

  constructor() { }

  ngOnInit(): void {
  }

}
