//maybe it will come in handy in some time..

import { Injectable } from "@angular/core";
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";

import { UserService } from "../user-service/user.service";

@Injectable({
  providedIn: "root"
})
export class AdminAuthGuardService implements CanActivate {
  constructor(private router: Router, private userService: UserService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const isAdmin = this.userService.isAdminUser();
    if (isAdmin) {
      return true;
    } else {
      this.router.navigate(["/home"]);
      return false;
    }
  }
}
