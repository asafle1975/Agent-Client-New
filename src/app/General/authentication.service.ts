import { Injectable } from '@angular/core';
import { AuthData } from './Models/AuthData';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private readonly AUTHORIZATION_KEY: string = 'AuthData';

  constructor() { }

  firstJwtChecking(): boolean {

    if (this.isJwtExisting() == false) {

        console.log(`JWT is missing`);
        return true;
      }
      return false;
  }

  isJwtExisting(): boolean {
    if (this.getToken() && this.getToken() != null)
      return true;
    return false;
  }
  setToken(token: string): void {

    localStorage.setItem(this.AUTHORIZATION_KEY, token);
  }

  getToken(): string {
    return localStorage.getItem(this.AUTHORIZATION_KEY);
  }

  removeToken(): void {
    localStorage.removeItem(this.AUTHORIZATION_KEY);
  }

  parseToken(token: string): AuthData {
    if (!token) return null;
    var jsonPayload = this.parseJwt(token);
    const authData: AuthData = JSON.parse(jsonPayload.AuthData);
    return authData;
  }

  private parseJwt(token): any {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  }
}

