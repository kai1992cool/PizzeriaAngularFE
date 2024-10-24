import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnonUserCheckoutFormComponent } from './anon-user-checkout-form.component';

describe('AnonUserCheckoutFormComponent', () => {
  let component: AnonUserCheckoutFormComponent;
  let fixture: ComponentFixture<AnonUserCheckoutFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnonUserCheckoutFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnonUserCheckoutFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
