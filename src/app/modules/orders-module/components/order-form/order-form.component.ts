import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Order } from "../../model/order";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import * as moment from "moment";
import { DATE_FORMAT } from "../../../../../environments/environment";
import { UsersService } from "../../../users-module/services/users-service/users.service";
import { User } from "../../../users-module/model/user";

@Component({
  selector: "app-order-form",
  templateUrl: "./order-form.component.html",
  styleUrls: ["./order-form.component.css"]
})
export class OrderFormComponent implements OnInit {
  orderForm: FormGroup;
  statuses: String[] = ["new", "in progress", "completed", "cancelled"];
  users: User[];
  selected = this.data.user;
  constructor(
    public dialogRef: MatDialogRef<OrderFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Order,
    formBuilder: FormBuilder,
    public usersService: UsersService
  ) {
    data.createdDate = moment(data.createdDate).format(DATE_FORMAT);
    data.dateFrom = moment(data.dateFrom).format(DATE_FORMAT);
    data.dateTo = moment(data.dateTo).format(DATE_FORMAT);
    this.orderForm = formBuilder.group({
      createdDate: data.createdDate,
      dateFrom: data.dateFrom,
      dateTo: data.dateTo,
      user: data.user,
      status: data.status,
      adultBikes: [Validators.min(1)],
      childBikes: [Validators.min(1)]
    });
  }

  ngOnInit() {
    this.getAllUsers();
  }

  save(order: Order) {
    console.log(JSON.stringify(order));
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getAllUsers() {
    this.usersService.getAllUsers().subscribe(users => (this.users = users));
  }

  //to fix pre-select issue https://github.com/angular/material2/issues/8212
  //https://angular.io/api/forms/SelectControlValueAccessor
  compareFn(c1: User, c2: User): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
}
