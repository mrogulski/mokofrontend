import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class MessageService {
  messages: string[] = [];

  add(message: string) {
    this.messages.push(message);
  }

  public clear(message?: string, index?: number) {
    if (message) {
      for (let mess of this.messages) {
        if (message == mess) {
          this.messages.splice(index, 1); //zastapic te funkcje
          console.log("powinno sie ususnac " + mess + "index " + index);
        }
      }
    } else {
      this.messages = [];
    }
  }
}
