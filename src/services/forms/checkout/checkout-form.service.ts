import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckoutFormService {
  storeDeliveryOptionVisibility = true;
  programmedDeliveryTimeVisibility = false;
  requestChangeOption = true;
  changeRequestInput = false;

  showStoreDeliveryOption() {
    this.storeDeliveryOptionVisibility = true;
  }

  hideStoreDeliveryOption() {
    this.storeDeliveryOptionVisibility = false;
  }

  showProgrammedDeliveryTime() {
    this.programmedDeliveryTimeVisibility = true;
  }

  hideProgrammedDeliveryTime() {
    this.programmedDeliveryTimeVisibility = false;
  }

  allowRequestChangeOption() {
    this.requestChangeOption = true;
  }

  disallowRequestChangeOption() {
    this.requestChangeOption = false;
  }

  showChangeRequestInput() {
    this.changeRequestInput = true;
  }

  hideChangeRequestInput() {
    this.changeRequestInput =  false;
  }
}
