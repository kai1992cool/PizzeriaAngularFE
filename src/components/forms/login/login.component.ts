import {ChangeDetectionStrategy, Component, DestroyRef, inject} from '@angular/core';
import {RouterLink} from '@angular/router';
import {PaginatorModule} from 'primeng/paginator';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {emailRgx, passwordRegex} from '../../../regex';
import {LoginService} from '../../../services/login/login.service';
import {AuthService} from '../../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    PaginatorModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  private loginService = inject(LoginService);
  private authService = inject(AuthService);
  private destroyRef = inject(DestroyRef);

  form = new FormGroup({
    email: new FormControl<string>("", {
      validators: [Validators.pattern(emailRgx)],
      nonNullable: true,
      updateOn: 'blur'
    }),
    password: new FormControl<string>("", {
      validators: [Validators.pattern(passwordRegex)],
      nonNullable: true,
      updateOn: 'blur'
    }),
  });

  public onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      console.log(this.form.controls);
      return;
    }

    const sub = this.loginService.login({
      email: this.form.get("email")!.value,
      password: this.form.get("password")!.value,
    }).subscribe({
      next: value => {
        console.log("response: ", value);
      },
      error: error => {
        console.log("error: ", error.error);
      },
      complete: () => {
        this.authService.setUserCredentials(getCookie("idToken"));
      }
    });

    this.destroyRef.onDestroy(() => sub.unsubscribe());
  }
}

const getCookie = (key: string) => {
  const b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");

  if (b !== null) {
    if (b.length === 0) {
      return "";
    } else {
      return b.pop()!;
    }
  }

  return "";
};
