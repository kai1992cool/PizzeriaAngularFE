import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DOCUMENT} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private httpClient = inject(HttpClient);
  private document = inject(DOCUMENT);

  setCookie(name: string, value: string, expireDays: number, path: string = '') {
    let d: Date = new Date();
    d.setTime(d.getTime() + expireDays * 24 * 60 * 60 * 1000);
    let expires: string = `expires=${d.toUTCString()}`;
    let cpath: string = path ? `; path=${path}` : '';
    this.document.cookie = `${name}=${value}; ${expires}${cpath}`;
  }

  public login() {
    this.setCookie("idToken", "value", 1, "/");

    /*    return this.httpClient.post(`http://192.168.1.128:8080/api/auth/login?username=${data.email}&password=${data.password}`,
          {responseType: "text"},
          {withCredentials: true})
          .pipe(
            catchError((err) => {
              throw err as string;
            })
          );*/
  }
}
