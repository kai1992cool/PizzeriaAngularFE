import {inject, Injectable} from '@angular/core';
import {jwtDecode, JwtPayload} from 'jwt-decode';
import {SsrCookieService} from 'ngx-cookie-service-ssr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private cookieService = inject(SsrCookieService);
  public userEmail: string | undefined = undefined;
  public userId: string | undefined = undefined;

  public isAuthenticated() {
    return this.cookieService.check("idToken");
  }

  public hydrate() {
    if (this.userEmail === undefined && this.userId === undefined && this.isAuthenticated()) {
      this.setUserCredentials(this.cookieService.get("idToken"));
    }
  }

  private setUserCredentials(token: string) {
    const idToken = this.decode(token);
    if (idToken !== null) {
      this.userEmail = idToken.sub;
      this.userId = idToken.userId;
    }
  }

  public getUserCredentials(): UserCredentials {
    this.hydrate();
    return {
      isAuthenticated: this.isAuthenticated(),
      userEmail: this.getUserEmail(),
      userId: this.getUserId()
    };
  }

  private decode(token: string): MyJwtPayload | null {
    try {
      return jwtDecode(token);
    } catch (invalidTokenError) {
      console.log(invalidTokenError);
      return null;
    }
  }

  private getUserEmail() {
    return this.userEmail !== undefined ? this.userEmail : null;
  }

  private getUserId() {
    return this.userId !== undefined ? this.userId : null;
  }
}

interface MyJwtPayload extends JwtPayload {
  userId?: string;
}

export interface UserCredentials {
  isAuthenticated: boolean;
  userId: string | null;
  userEmail: string | null;
}
