import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { LoginComponent } from "./common-components/login/login.component";

import { AppRoutingModule } from "./modules/app-routing/app-routing.module";
import { MessagesComponent } from "./common-components/messages/messages.component";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from "@angular/forms";
import { HomeComponent } from "./common-components/home/home.component";

import { HttpModule } from "@angular/http";
import { HttpClientModule } from "@angular/common/http";

import { JwtModule } from "@auth0/angular-jwt";

import { OrdersModule } from "./modules/orders-module/orders.module";
import { StatsModule } from "./modules/stats-module/stats.module";
import { UsersModule } from "./modules/users-module/users.module";
import { NavbarComponent } from "./common-components/navbar/navbar.component";
import { MatButtonModule } from "@angular/material/button";

export function tokenGetter() {
  return localStorage.getItem("access_token");
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MessagesComponent,
    HomeComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatButtonModule,
    HttpModule,
    HttpClientModule,
    NgbModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter
      }
    }),
    OrdersModule,
    StatsModule,
    UsersModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
