import { Component, OnInit } from "@angular/core";
import { UserFormComponent } from "../user-form/user-form.component";
import { MatDialog } from "@angular/material";
import { User } from "../../model/user";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"]
})
export class UsersComponent implements OnInit {
  user: User = {
    id: null,
    username: null,
    firstName: null,
    lastName: null,
    email: null
  };

  constructor(public dialog: MatDialog) {}

  ngOnInit() {}

  newUser() {
    const dialogRef = this.dialog.open(UserFormComponent, {
      data: this.user
    });
  }
}
