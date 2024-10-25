import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckoutFormService {
  private _storeDeliveryOptionVisibility = true;
  private _programmedDeliveryTimeVisibility = false;
  private _requestChangeOption = true;
  private _changeRequestInput = false;

  get storeDeliveryOptionVisibility(): boolean {
    return this._storeDeliveryOptionVisibility;
  }

  get programmedDeliveryTimeVisibility(): boolean {
    return this._programmedDeliveryTimeVisibility;
  }

  get requestChangeOption(): boolean {
    return this._requestChangeOption;
  }

  get changeRequestInput(): boolean {
    return this._changeRequestInput;
  }

  showStoreDeliveryOption() {
    this._storeDeliveryOptionVisibility = true;
  }

  hideStoreDeliveryOption() {
    this._storeDeliveryOptionVisibility = false;
  }

  showProgrammedDeliveryTime() {
    this._programmedDeliveryTimeVisibility = true;
  }

  hideProgrammedDeliveryTime() {
    this._programmedDeliveryTimeVisibility = false;
  }

  allowRequestChangeOption() {
    this._requestChangeOption = true;
  }

  disallowRequestChangeOption() {
    this._requestChangeOption = false;
  }

  showChangeRequestInput() {
    this._changeRequestInput = true;
  }

  hideChangeRequestInput() {
    this._changeRequestInput = false;
  }
}
