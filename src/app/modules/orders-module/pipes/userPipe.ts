import { Pipe, PipeTransform } from "@angular/core";
import { UsersService } from "../../users-module/services/users-service/users.service";

@Pipe({ name: "userPipe" })
export class UserPipe implements PipeTransform {
  constructor(private usersService: UsersService) {}

  transform(value: number): String {
    console.log(value);
    let name: String;

    this.usersService.findByID(value).subscribe(data => {
      name = data.username;
      console.log("imie " + name);
    });

    return name;
    //poprawic to
  }
}
