import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";

const jwtHelper = new JwtHelperService();

@Injectable({
  providedIn: "root"
})
export class UserService {
  /*angular2-jwt is a small and unopinionated library that is useful for automatically attaching a JSON Web Token (JWT) 
  as an Authorization header when making HTTP requests from an Angular 2 app. It also has a number of helper methods 
  that are useful for doing things like decoding JWTs.*/

  accessToken: string;
  isAdmin: boolean;

  constructor() {}

  login(accessToken: string) {
    const decodedToken = jwtHelper.decodeToken(accessToken);
    console.log(decodedToken);

    this.isAdmin = decodedToken.authorities.some(el => el === "ADMIN_USER");
    this.accessToken = accessToken;

    localStorage.setItem("access_token", accessToken);
  }

  logout() {
    this.accessToken = null;
    this.isAdmin = false;
    localStorage.removeItem("access_token");
  }

  isAdminUser(): boolean {
    return this.isAdmin;
  }

  isUser(): boolean {
    return this.accessToken && !this.isAdmin;
  }
}
