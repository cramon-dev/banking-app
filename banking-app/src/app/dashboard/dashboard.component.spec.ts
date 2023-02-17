import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;

    // Ideally, I would like to move this mock data into a separate file so it and this test file aren't so tightly bound.
    // Not to mention it would make for an easier time to modify the data like through some automated task.
    component.user = {
      id: 1,
      name: 'Christian',
      accounts: [
        {
          accountNumber: 1, balance: 100, transactions: []
        }
      ]
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display user accounts if there are any', () => {
    const accounts = fixture.nativeElement.querySelector('app-account-info');
    expect(accounts.length).toEqual(1);
  });
});
