import { Pipe, PipeTransform } from "@angular/core";
import { UsersService } from "../../users-module/services/users-service/users.service";
import { User } from "../../users-module/model/user";
import { Observable } from "rxjs";

@Pipe({ name: "userPipe" })
export class UserPipe implements PipeTransform {
  constructor(private usersService: UsersService) {}

  transform(value: number): Observable<User> {
    return this.usersService.findByID(value);
  }
}
