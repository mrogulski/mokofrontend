import { Injectable } from "@angular/core";
import { Order } from "../../model/order";
import { environment } from "../../../../../environments/environment";
import { Http, Headers } from "@angular/http";
import { Observable, of } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthenticationService } from "../../../../services/authentication-service/authentication.service";
import { map, filter } from "rxjs/operators";

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

  getOrdersByDate(start: string, end: string): Observable<Order[]> {
    return this.http.get<Order[]>(
      this.API_URL + `/orders/date?start=${start}&end=${end}`,
      this.httpOptions
    );
  }

  save(order: Order) {
    return this.http.post(this.API_URL + "/orders", order, this.httpOptions);
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

  getRentBikes(date: Date) {
    return this.http.get(this.API_URL + `/bikes/${date}`, this.httpOptions);
  }

  getAvailableBikes(
    dateFrom: string,
    dateTo: string,
    type: string
  ): Observable<Number> {
    return this.http.get<Number>(
      this.API_URL +
        `/bikes/availability?dateFrom=${dateFrom}&dateTo=${dateTo}&type=${type}`,
      this.httpOptions
    );
  }

  getBikesTotal(type?: String): Observable<Number> {
    if (type) {
      return this.http.get<Number>(
        this.API_URL + `/bikes/total?type=${type}`,
        this.httpOptions
      );
    } else {
      return this.http.get<Number>(
        this.API_URL + `/bikes/total`,
        this.httpOptions
      );
    }
  }
}
