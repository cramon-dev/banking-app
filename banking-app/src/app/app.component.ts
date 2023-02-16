import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  user!: User; // TODO - Abstract the user away from here. I'm thinking what if we added a resolver for this initial route which provided that data for us?

  ngOnInit() {
    this.user = {
      id: 0,
      name: 'Christian',
      accounts: []
    };
  }
}
