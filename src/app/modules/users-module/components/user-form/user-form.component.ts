import { Component, OnInit, Inject } from "@angular/core";
import { User } from "../../model/user";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { FormGroup, FormBuilder } from "@angular/forms";

@Component({
  selector: "app-user-form",
  templateUrl: "./user-form.component.html",
  styleUrls: ["./user-form.component.css"]
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    formBuilder: FormBuilder
  ) {
    this.userForm = formBuilder.group({});
  }

  ngOnInit() {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  save(user: User) {}
}
