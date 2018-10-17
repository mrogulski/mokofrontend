import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  private API_URL = environment.API_URL;
  private TOKEN_AUTH_USERNAME = environment.TOKEN_AUTH_USERNAME;
  private TOKEN_AUTH_PASSWORD = environment.TOKEN_AUTH_PASSWORD;

  constructor(private http: Http) {}

  login(username: string, password: string) {
    const body = `username=${encodeURIComponent(
      username
    )}&password=${encodeURIComponent(password)}&grant_type=password`;

    const headers = new Headers();
    headers.append("Content-Type", "application/x-www-form-urlencoded");
    headers.append(
      "Authorization",
      "Basic " + btoa(this.TOKEN_AUTH_USERNAME + ":" + this.TOKEN_AUTH_PASSWORD)
    );
    return this.http.post(this.API_URL + "/oauth/token", body, { headers });
  }
}
