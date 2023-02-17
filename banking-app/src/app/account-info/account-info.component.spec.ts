import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountInfoComponent } from './account-info.component';

describe('AccountInfoComponent', () => {
  let component: AccountInfoComponent;
  let fixture: ComponentFixture<AccountInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountInfoComponent);
    component = fixture.componentInstance;

    component.account = {
      accountNumber: 1234,
      balance: 100,
      transactions: [
        { id: '1234-ABCD', amount: 1000, date: new Date() }
      ]
    }

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display transactions if there are any', () => {
    const transactions = fixture.nativeElement.querySelectorAll('.transaction');
    expect(transactions.length).toEqual(1);
  })
});
