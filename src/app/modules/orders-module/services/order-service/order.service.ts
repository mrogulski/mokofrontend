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
  private httpOptions: {};

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) {
    this.access_token = this.authenticationService.getToken();
    this.httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.access_token}`
      })
    };
  }

  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.API_URL + "/orders", this.httpOptions);
  }

  getTodaysOrders(): Observable<Order[]> {
    return null;
  }

  save(order: Order) {
    return this.http.post(this.API_URL + "/ordres", order, this.httpOptions);
  }

  complete(order: Order) {
    order.status = "completed";
    console.log("order to update " + order);
    return this.http.patch(
      this.API_URL + `/orders/${order.id}`,
      order,
      this.httpOptions
    );
  }

  edit(order: Order) {
    return this.http.patch(
      this.API_URL + `/orders/${order.id}`,
      order,
      this.httpOptions
    );
  }

  cancel(orderID: number) {
    return this.http.delete(
      this.API_URL + `/orders/${orderID}`,
      this.httpOptions
    );
  }
}
