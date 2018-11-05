import { Injectable } from "@angular/core";
import { Order } from "../../model/order";
import { environment } from "../../../../../environments/environment";
import { Http, Headers } from "@angular/http";
import { Observable, of } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthenticationService } from "../../../../services/authentication-service/authentication.service";

@Injectable({
  providedIn: "root"
})
export class OrderService {
  private API_URL = environment.API_URL;
  private access_token: string;

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) {
    this.access_token = this.authenticationService.getToken();
  }

  getAllOrders(): Observable<Order[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.access_token}`
      })
    };
    return this.http.get<Order[]>(this.API_URL + "/orders", httpOptions);
  }
}
