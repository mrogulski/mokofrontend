import { Component } from "@angular/core";
import { AuthGuardService } from "./services/auth-guard-service/auth-guard.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "mokofrontend";
  canActivate: boolean;

  constructor(authguard: AuthGuardService) {
    this.canActivate = authguard.canActivate();
    console.log("can activate " + authguard.canActivate());
  }
}
