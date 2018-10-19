import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "../../common-components/login/login.component";
import { HomeComponent } from "../../common-components/home/home.component";
import { OrdersComponent } from "../orders-module/components/orders/orders.component";
import { StatsComponent } from "../stats-module/components/stats/stats.component";
import { UsersComponent } from "../users-module/components/users/users.component";
import { AuthGuardService as AuthGuard } from "../../services/auth-guard-service/auth-guard.service";

const routes: Routes = [
  {
    path: "",
    redirectTo: "/home",
    pathMatch: "full",
    canActivate: [AuthGuard]
  },
  { path: "login", component: LoginComponent },
  { path: "home", component: HomeComponent, canActivate: [AuthGuard] },
  { path: "orders", component: OrdersComponent, canActivate: [AuthGuard] },
  { path: "stats", component: StatsComponent, canActivate: [AuthGuard] },
  { path: "users", component: UsersComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
