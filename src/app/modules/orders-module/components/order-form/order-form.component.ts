import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Order } from "../../model/order";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import * as moment from "moment";
import {
  DATE_FORMAT,
  SAVE_DATE_FORMAT
} from "../../../../../environments/environment";
import { UsersService } from "../../../users-module/services/users-service/users.service";
import { User } from "../../../users-module/model/user";

import { FormControl } from "@angular/forms";

import { ReplaySubject } from "rxjs";
import { Subject } from "rxjs";

import { takeUntil } from "rxjs/operators";
import { OrderService } from "../../services/order-service/order.service";

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
  public userFilterCtrl: FormControl = new FormControl();

  /** list of users filtered by search keyword */
  public filteredUsers: ReplaySubject<User[]> = new ReplaySubject<User[]>(1);

  private _onDestroy = new Subject<void>();

  constructor(
    private dialogRef: MatDialogRef<OrderFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Order,
    formBuilder: FormBuilder,
    private usersService: UsersService,
    private orderService: OrderService
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
      childBikes: [Validators.min(1)],
      helmet: data.helmet,
      lock: data.lock,
      pickup: data.pickup,
      pickupFrom: data.pickupFrom,
      pickupTo: data.pickupTo,
      pickupDistance: data.pickupDistance,
      pickupValue: [{ value: data.pickupValue }],
      initialValue: [{ value: data.initialValue }],
      finalValue: data.finalValue
    });
  }

  ngOnInit() {
    this.getAllUsers();
    // listen for search field value changes
    this.userFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterUsers();
      });
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  save(order: Order) {
    order.createdDate = String(
      moment(order.createdDate).format(SAVE_DATE_FORMAT)
    );
    order.dateFrom = String(moment(order.dateFrom).format(SAVE_DATE_FORMAT));
    order.dateTo = String(moment(order.dateTo).format(SAVE_DATE_FORMAT));
    console.log(" order to save " + JSON.stringify(order));
    this.orderService
      .save(order)
      .subscribe(data => console.log(" order saved " + data));
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getAllUsers() {
    this.usersService.getAllUsers().subscribe(users => (this.users = users));
  }
  filterUsersServerSide(search: string) {
    this.usersService
      .getFilteredUsers(search)
      .subscribe(users => (this.users = users));
  }

  private filterUsers() {
    if (!this.users) {
      return;
    }
    // get the search keyword
    let search = this.userFilterCtrl.value;
    if (!search) {
      this.getAllUsers();
      console.log("wszytskei usery");
      return;
    } else {
      search = search.toLowerCase();
      // filter the users
      //server side
      this.filterUsersServerSide(search);
      console.log("szuka userow w bazie");
      return;
    }
  }

  //to fix pre-select issue https://github.com/angular/material2/issues/8212
  //https://angular.io/api/forms/SelectControlValueAccessor
  compareFn(c1: User, c2: User): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
}
