import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl, FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import {CheckoutFormService} from '../../../../services/forms/checkout/checkout-form.service';
import {
  esCharsAndNumbersAndBasicSymbolsRgx,
  esCharsAndNumbersRegex,
  esCharsRegex,
  numbersRegex
} from '../../../../regex';
import {CartComponent} from '../../../cart/cart.component';

@Component({
  selector: 'app-anon-user-checkout-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CartComponent
  ],
  templateUrl: './anon-user-checkout-form.component.html',
  styleUrl: './anon-user-checkout-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnonUserCheckoutFormComponent {
  protected checkoutFormService = inject(CheckoutFormService);

  form = new FormGroup({
    customer: new FormGroup({
      fullName: new FormControl("", {
        validators: [Validators.required, Validators.minLength(2), Validators.maxLength(50)],
        nonNullable: true,
        updateOn: "blur"
      }),
      contactNumber: new FormControl("", {
        validators: [Validators.required, Validators.minLength(2), Validators.maxLength(50)],
        nonNullable: true,
        updateOn: "blur"
      }),
      email: new FormControl("", {
        validators: [Validators.required, Validators.email],
        nonNullable: true,
        updateOn: "blur"
      })
    }),
    address: new FormGroup({
      id: new FormControl<number | null>(null),
      street: new FormControl(
        "", {
          validators: [Validators.required, Validators.pattern(esCharsRegex), validateStreet],
          nonNullable: true,
          updateOn: "blur"
        }
      ),
      number: new FormControl(
        "", {
          validators: [Validators.required, Validators.pattern(numbersRegex), validateStreetNumber],
          nonNullable: true,
          updateOn: "blur"
        }
      ),
      gate: new FormControl<string | null>(null, [Validators.pattern(esCharsAndNumbersRegex), Validators.maxLength(25)]),
      staircase: new FormControl<string | null>(null, [Validators.pattern(esCharsAndNumbersRegex), Validators.maxLength(25)]),
      floor: new FormControl<string | null>(null, [Validators.pattern(esCharsAndNumbersRegex), Validators.maxLength(25)]),
      door: new FormControl<string | null>(null, [Validators.pattern(esCharsAndNumbersRegex), Validators.maxLength(25)])
    }),
    orderDetails: new FormGroup({
      deliveryChoice: new FormControl("Lo antes posible", {
        validators: [Validators.required],
        nonNullable: true,
        updateOn: "blur"
      }),
      deliveryTime: new FormControl<string | null>(null, validateDeliveryTime),
      paymentMethod: new FormControl("Tarjeta", {
        validators: [Validators.required],
        nonNullable: true,
        updateOn: "blur"
      }),
      changeRequestChoice: new FormControl({value: "F", disabled: true}, {
        validators: [validateChangeToGive],
        nonNullable: true,
        updateOn: "blur"
      }),
      billToChange: new FormControl<number | null>(null, [Validators.pattern(numbersRegex), validateChangeToGive]),
      comment: new FormControl<string | null>(null, [Validators.pattern(esCharsAndNumbersAndBasicSymbolsRgx), Validators.maxLength(250)])
    })
  });

  onSubmit(): void {
    console.log(this.form.get("customer.fullName")?.value);
    if (this.form.invalid) {
      this.form.markAllAsTouched();
    } else {
      this.checkoutFormService.createNewAnonOrder({
        anonCustomerName: this.form.get("customer.fullName")!.value,
        anonCustomerContactNumber: Number(this.form.get("customer.contactNumber")!.value),
        anonCustomerEmail: this.form.get("customer.email")!.value,
        address: {
          id: this.form.get("address.id")!.value,
          street: this.form.get("address.street")!.value,
          streetNr: Number(this.form.get("address.number")!.value),
          gate: this.form.get("address.gate")!.value,
          staircase: this.form.get("address.staircase")!.value,
          floor: this.form.get("address.floor")!.value,
          door: this.form.get("address.door")!.value,
        },
        orderDetails: {
          id: this.form.get("orderDetails.id")!.value,
          deliveryChoice: this.form.get("orderDetails.deliveryChoice")!.value,
          paymentMethod: this.form.get("orderDetails.paymentMethod")!.value,
          deliveryTime: this.form.get("orderDetails.deliveryTime")!.value,
          changeRequestChoice: this.form.get("orderDetails.changeRequestChoice")!.value,
          billToChange: this.form.get("orderDetails.billToChange")!.value,
          comment: this.form.get("orderDetails.comment")!.value,
        },
        cart: {
          id: 0,
          orderItems: [],
          totalCost: 0,
          totalCostOffers: 0,
          totalQuantity: 0
        }
      });
    }
  }
}

const validateStreet: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  return null;
};

const validateStreetNumber: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  return null;
};

const validateContactNumber: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  return null;
};

const validateDeliveryTime: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const deliverNow = control.get("deliverNow");

  if (deliverNow && !deliverNow.value) {
    const deliveryTime = control.get("deliveryTime");
    if (deliveryTime && (!deliveryTime.value || deliveryTime.value.length < 0)) {
      return {valid: false};
    }
  }

  return null;
};

const validateChangeToGive: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const changeRequested = control.get("changeRequested");

  if (changeRequested) {
    const changeToGive = control.get("changeToGive");
    if (changeToGive && (changeToGive.value === 0 || changeToGive.value < 0)) {
      return {valid: false};
    }
  }

  return null;
};
