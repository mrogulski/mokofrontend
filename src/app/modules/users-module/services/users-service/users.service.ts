import { Injectable } from "@angular/core";
import { environment } from "../../../../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthenticationService } from "../../../../services/authentication-service/authentication.service";
import { User } from "../../model/user";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class UsersService {
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

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.API_URL + "/users", this.httpOptions);
  }
}
