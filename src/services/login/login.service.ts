import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoginForm} from '../../interfaces/dto/forms/account';
import {catchError, of} from 'rxjs';
import test from 'node:test';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private httpClient = inject(HttpClient);

  public login(data: LoginForm) {
    return of('test.eyJzdWIiOiJ0ZXN0QHRlc3RlciIsInVzZXJJZCI6MTIzfQ==');
    return this.httpClient.post(`http://192.168.1.128:8080/api/auth/login?username=${data.email}&password=${data.password}`,
      {responseType: "text"},
      {withCredentials: true})
      .pipe(
        catchError((err) => {
          throw err as string;
        })
      );
  }
}
