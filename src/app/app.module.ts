import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { LoginComponent } from "./common-components/login/login.component";

import { AppRoutingModule } from "./modules/app-routing/app-routing.module";
import { MessagesComponent } from "./common-components/messages/messages.component";

import { AccordionModule } from "primeng/components/accordion/accordion";
import { PanelModule } from "primeng/components/panel/panel";
import { ButtonModule } from "primeng/components/button/button";
import { RadioButtonModule } from "primeng/components/radioButton/radioButton";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from "@angular/forms";
import { HomeComponent } from "./common-components/home/home.component";

import { HttpModule } from "@angular/http";

import { JwtModule } from "@auth0/angular-jwt";

import { OrdersModule } from "./modules/orders-module/orders.module";

export function tokenGetter() {
  return localStorage.getItem("access_token");
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MessagesComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    AccordionModule,
    PanelModule,
    ButtonModule,
    RadioButtonModule,
    HttpModule,
    NgbModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter
      }
    }),
    OrdersModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
