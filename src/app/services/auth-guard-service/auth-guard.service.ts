import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";

import { AuthenticationService } from "../authentication-service/authentication.service";

@Injectable({
  providedIn: "root"
})
export class AuthGuardService implements CanActivate {
  constructor(
    private router: Router,
    public auth: AuthenticationService,
    public jwtHelper: JwtHelperService
  ) {}

  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(["/login"]);
      return false;
    }
    return true;
  }
}
