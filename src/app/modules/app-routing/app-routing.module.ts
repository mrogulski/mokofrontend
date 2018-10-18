import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "../../common-components/login/login.component";
import { HomeComponent } from "../../common-components/home/home.component";
import { AuthGuardService as AuthGuard } from "../../services/auth-guard-service/auth-guard.service";

const routes: Routes = [
  {
    path: "",
    redirectTo: "/home",
    pathMatch: "full",
    canActivate: [AuthGuard]
  },
  { path: "login", component: LoginComponent },
  { path: "home", component: HomeComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
