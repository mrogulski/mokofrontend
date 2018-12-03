import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class UserIDService {
  private ID = new Subject<number>();
  currentID = this.ID.asObservable();

  constructor() {}

  changeMessage(ID: number) {
    this.ID.next(ID);
  }
}
