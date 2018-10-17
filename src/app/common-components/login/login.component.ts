import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../../services/authentication.service";
import { catchError, map, tap } from "rxjs/operators";
import { Observable, of } from "rxjs";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  credentials: any = {};

  constructor(public authenticationService: AuthenticationService) {}

  ngOnInit() {}

  login() {
    this.authenticationService
      .login(this.credentials.username, this.credentials.password)
      .toPromise()
      .then(response => console.log(response));
  }
}
