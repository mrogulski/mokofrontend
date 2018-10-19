import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../../services/authentication-service/authentication.service";
import { UserService } from "../../services/user-service/user.service";
import { Router } from "@angular/router";
import { MessageService } from "../../services/message-service/message.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  credentials: any = {};
  error: string = "";

  constructor(
    public authenticationService: AuthenticationService,
    private userService: UserService,
    private router: Router,
    public messageService: MessageService
  ) {}

  ngOnInit() {}

  login() {
    this.authenticationService
      .login(this.credentials.username, this.credentials.password)
      .subscribe(
        results => {
          this.userService.login(results);
          this.router.navigate(["/home"]);
          console.log("is admin " + this.userService.isAdminUser());
        },
        err => {
          if (err.status == 0) {
            this.error = "Something went wrong please try again later";
          }
          if (err.status == 401) {
            this.error = "Invalid credentials";
          }

          this.messageService.add(this.error);
        }
      );
  }
}
