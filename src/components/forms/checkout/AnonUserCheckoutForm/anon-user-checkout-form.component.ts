import {Component, inject} from '@angular/core';
import {
  AbstractControl,
  FormBuilder, FormControl,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import {CheckoutFormService} from '../../../../services/forms/checkout/checkout-form.service';

@Component({
  selector: 'app-anon-user-checkout-form',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './anon-user-checkout-form.component.html',
  styleUrl: './anon-user-checkout-form.component.css'
})
export class AnonUserCheckoutFormComponent {
  private formBuilder = inject(FormBuilder)
  protected checkoutFormService = inject(CheckoutFormService)
  anonUserCheckoutFormForm = this.formBuilder.group({
      customer: this.formBuilder.group({
        fullName: ["", {validators: [Validators.required], nonNullable: true, updateOn: "blur"}],
        contactNumber: ["", {validators: [Validators.required, Validators.max(9), Validators.min(9)], nonNullable: true, updateOn: "blur"}],
        email: ["", [Validators.required, Validators.email]],
      }),
      address: this.formBuilder.group({
        id: [0],
        street: ["", [Validators.required]],
        number: [0, [Validators.required]],
        portal: [""],
        staircase: [""],
        floor: [""],
        door: [""],
    }),
    orderDetails: this.formBuilder.group({
        deliverNow: [true, [Validators.required]],
        deliveryTime: ["", validateDeliveryTime],
        paymentMethod: ["Tarjeta", [Validators.required]],
        changeRequested: new FormControl({value: "F", disabled: true,}, {validators: [validateChangeToGive], nonNullable: true, updateOn: "blur"}),
        changeToGive: [0, [validateChangeToGive]],
        comment: ["", [Validators.maxLength(250)]],
    })
  })

  onSubmit(): void {
    console.log(this.anonUserCheckoutFormForm)
  }
}

const validateContactNumber: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  return null
}

const validateDeliveryTime: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const deliverNow = control.get("deliverNow");

    if (deliverNow && !deliverNow.value) {
      const deliveryTime = control.get("deliveryTime");
      if (deliveryTime && (!deliveryTime.value || deliveryTime.value.length < 0)) {
        return {valid: false}
      }
    }

    return null;
}

const validateChangeToGive: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const changeRequested = control.get("changeRequested");

    if (changeRequested) {
      const changeToGive= control.get("changeToGive");
      if (changeToGive && (changeToGive.value === 0 || changeToGive.value < 0)) {
        return {valid: false}
      }
    }

    return null;
}
