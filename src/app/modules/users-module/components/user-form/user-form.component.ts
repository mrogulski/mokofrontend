import {
  Component,
  OnInit,
  Inject,
  Output,
  EventEmitter,
  Input
} from "@angular/core";
import { User } from "../../model/user";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UsersService } from "../../services/users-service/users.service";
import { UserIDService } from "../../services/userID-service/user-id.service";

@Component({
  selector: "app-user-form",
  templateUrl: "./user-form.component.html",
  styleUrls: ["./user-form.component.css"]
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  @Output() userID = new EventEmitter<string>();

  constructor(
    private dialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    formBuilder: FormBuilder,
    private usersService: UsersService,
    private userIDService: UserIDService
  ) {
    this.userForm = formBuilder.group({
      id: data.id,
      lastName: data.lastName,
      firstName: data.firstName,
      address: data.address,
      phone: data.phone,
      email: data.email
    });
  }

  ngOnInit() {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  save(user: User) {
    if (user.id) {
      console.log("edit usera");
      // this.usersService.
    } else {
      console.log("nowy user " + JSON.stringify(user));
      this.usersService.save(user).subscribe(data => {
        this.userID.emit(JSON.stringify(data));
        this.userIDService.changeMessage(Number(data));
      });
    }

    this.onNoClick();
  }
}
