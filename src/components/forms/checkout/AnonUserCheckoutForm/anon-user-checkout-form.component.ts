import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
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
  private formBuilder = inject(FormBuilder);
  protected checkoutFormService = inject(CheckoutFormService);

  form = this.formBuilder.group({
    customer: this.formBuilder.group({
      fullName: ["", {
        validators: [Validators.required, Validators.minLength(2), Validators.maxLength(50)],
        nonNullable: true,
        updateOn: "blur"
      }],
      contactNumber: ["", {
        validators: [validateContactNumber],
        nonNullable: true,
        updateOn: "blur"
      }],
      email: ["", {validators: [Validators.required, Validators.email], nonNullable: true, updateOn: "blur"}],
    }),
    address: this.formBuilder.group({
      id: [],
      street: ["", {
        validators: [Validators.required, Validators.pattern(esCharsRegex), validateStreet],
        nonNullable: true,
        updateOn: "blur"
      }],
      number: ["", {
        validators: [Validators.required, Validators.pattern(numbersRegex), validateStreetNumber],
        nonNullable: true,
        updateOn: "blur"
      }],
      portal: ["", [Validators.pattern(esCharsAndNumbersRegex), Validators.maxLength(25)]],
      staircase: ["", [Validators.pattern(esCharsAndNumbersRegex), Validators.maxLength(25)]],
      floor: ["", [Validators.pattern(esCharsAndNumbersRegex), Validators.maxLength(25)]],
      door: ["", [Validators.pattern(esCharsAndNumbersRegex), Validators.maxLength(25)]],
    }),
    orderDetails: this.formBuilder.group({
      deliverNow: [true, [Validators.required]],
      deliveryTime: ["", validateDeliveryTime],
      paymentMethod: ["Tarjeta", [Validators.required]],
      changeRequested: new FormControl({value: "F", disabled: true,}, {
        validators: [validateChangeToGive],
        nonNullable: true,
        updateOn: "blur"
      }),
      changeToGive: ["", [Validators.pattern(numbersRegex), validateChangeToGive]],
      comment: ["", [Validators.pattern(esCharsAndNumbersAndBasicSymbolsRgx), Validators.maxLength(250)]],
    })
  });

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
    }
    console.log(this.form.value);
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
