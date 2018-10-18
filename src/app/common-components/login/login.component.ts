import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../../services/authentication-service/authentication.service";
import { UserService } from "../../services/user-service/user.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  credentials: any = {};
  constructor(
    public authenticationService: AuthenticationService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {}

  login() {
    this.authenticationService
      .login(this.credentials.username, this.credentials.password)
      .subscribe(results => {
        this.userService.login(results);
        this.router.navigate(["/home"]);
        console.log("is admin " + this.userService.isAdminUser());
      });
  }
}
