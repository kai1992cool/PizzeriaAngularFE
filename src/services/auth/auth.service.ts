import {Injectable} from '@angular/core';
import {jwtDecode, JwtPayload} from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public userEmail: string | undefined = undefined;
  public userId: string | undefined = undefined;

  public getUserCredentials(): UserCredentials {
    return {
      userEmail: this.getUserEmail(),
      userId: this.getUserId()
    };
  }

  private getUserEmail() {
    return this.userEmail !== undefined ? this.userEmail : null;
  }

  private getUserId() {
    return this.userId !== undefined ? this.userId : null;
  }

  public setUserCredentials(token: string) {
    const idToken = this.decode(token);
    if (idToken !== null) {
      this.userEmail = idToken.sub;
      this.userId = idToken.userId;
    }
  }

  private decode(token: string): MyJwtPayload | null {
    if (token === "") {
      return null;
    }

    try {
      return jwtDecode(token);
    } catch (invalidTokenError) {
      console.log(invalidTokenError);
      return null;
    }
  }
}

interface MyJwtPayload extends JwtPayload {
  userId?: string;
}

export interface UserCredentials {
  userId: string | null;
  userEmail: string | null;
}
