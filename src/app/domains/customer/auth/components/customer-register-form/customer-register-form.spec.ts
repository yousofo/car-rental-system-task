import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerRegisterForm } from './customer-register-form';

describe('CustomerRegisterForm', () => {
  let component: CustomerRegisterForm;
  let fixture: ComponentFixture<CustomerRegisterForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerRegisterForm],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerRegisterForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
