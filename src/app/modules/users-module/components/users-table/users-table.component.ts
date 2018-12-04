import { Component, OnInit } from "@angular/core";
import { UsersService } from "../../services/users-service/users.service";
import { User } from "../../model/user";
import { MatDialog } from "@angular/material";
import { UserFormComponent } from "../../../users-module/components/user-form/user-form.component";

@Component({
  selector: "app-users-table",
  templateUrl: "./users-table.component.html",
  styleUrls: ["./users-table.component.css"]
})
export class UsersTableComponent implements OnInit {
  users: User[];
  //sorting
  key: string = "id";
  reverse: boolean = false;
  //pagination
  p: number = 1;
  x: number = 10;

  constructor(private usersService: UsersService, public dialog: MatDialog) {}

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers() {
    this.usersService.getAllUsers().subscribe(users => {
      this.users = users;
    });
  }

  editUser(user: User) {
    const dialogRef = this.dialog.open(UserFormComponent, {
      data: user
    });
  }
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }
}
