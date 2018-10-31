import { Injectable } from "@angular/core";
import { Order } from "../../model/order";
import { environment } from "../../../../../environments/environment";
import { Http, Headers } from "@angular/http";
import { Observable, of } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class OrderService {
  private API_URL = environment.API_URL;

  constructor(private http: HttpClient) {}

  getAllOrders(): Observable<Order[]> {
    let access_token = localStorage.getItem("access_token");
    console.log("access tokrn " + access_token);
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${access_token}`
      })
    };
    console.log(
      "orders " +
        this.http.get<Order[]>(
          this.API_URL + "/orders?page=1&size=10",
          httpOptions
        )
    );
    return this.http.get<Order[]>(
      this.API_URL + "/orders?page=1&size=10",
      httpOptions
    );
  }
}
