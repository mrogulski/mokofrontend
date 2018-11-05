import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import { environment } from "../../../environments/environment";
import { map, catchError } from "rxjs/operators";
import { JwtHelperService } from "@auth0/angular-jwt";
import { HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  private API_URL = environment.API_URL;
  private TOKEN_AUTH_USERNAME = environment.TOKEN_AUTH_USERNAME;
  private TOKEN_AUTH_PASSWORD = environment.TOKEN_AUTH_PASSWORD;

  constructor(private http: Http, public jwtHelper: JwtHelperService) {}

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
    return (
      this.http
        .post(this.API_URL + "/oauth/token", body, { headers })
        .pipe(map(response => response.json()))
        // .pipe(catchError(this.handleError))
        .pipe(
          map((response: any) => {
            return response.access_token;
          })
        )
    );
  }

  public getToken(): string {
    return localStorage.getItem("access_token");
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem("access_token");
    return !this.jwtHelper.isTokenExpired(token);
  }
  //to future usage
  // private handleError(error: HttpErrorResponse) {
  //   if (error.error instanceof ErrorEvent) {
  //     // A client-side or network error occurred. Handle it accordingly.
  //     console.error("An error occurred:", error.error.message);
  //   } else {
  //     // The backend returned an unsuccessful response code.
  //     // The response body may contain clues as to what went wrong,
  //     console.error(
  //       `Backend returned code ${error.status}, ` + `body was: ${error.error}`
  //     );
  //   }
  //   // return an observable with a user-facing error message
  //   return throwError("Something bad happened; please try again later.");
  // }
}
