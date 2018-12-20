import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthenticationService } from "../../../services/authentication-service/authentication.service";
import { Http, Headers } from "@angular/http";
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class StatsService {
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

  getMoneyMonthly(month: number, year: number): Observable<number> {
    return this.http.get<number>(
      this.API_URL + `/stats/money?month=${month}&year=${year}`,
      this.httpOptions
    );
  }
}
