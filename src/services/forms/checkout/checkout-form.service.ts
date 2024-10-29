import {inject, Injectable} from '@angular/core';
import {FormControl} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {AnonOrderFormData} from '../../../interfaces/dto/forms/order';
import {catchError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckoutFormService {
  private httpService = inject(HttpClient);
  private _storeDeliveryOptionVisibility = true;
  private _programmedDeliveryTimeVisibility = false;
  private _requestChangeOption = true;
  private _changeRequestInput = false;

  public createNewAnonOrder(anonOrder: AnonOrderFormData) {
    return this.httpService.post<AnonOrderFormData>(`http://192.168.1.128:8080/api/anon/order`, anonOrder)
      .pipe(catchError((err, caught) => {
        // have to return an Observable or throw the error
        const message: string = err.error.message;
        const status: number = err.status;
        const statusText: string = err.statusText;
        const isOk: boolean = err.ok;
        throw `Http request error: ${message}. Status: ${status} Status text: ${statusText}. IsOk: ${isOk}`;
      }));
  }

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

  allowRequestChangeOption(changeRequested: FormControl<string>) {
    changeRequested.enable();
  }

  disallowRequestChangeOption(changeRequested: FormControl<string>) {
    changeRequested.disable();
  }

  showChangeRequestInput() {
    this._changeRequestInput = true;
  }

  hideChangeRequestInput() {
    this._changeRequestInput = false;
  }
}
