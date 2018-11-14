import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Order } from "../../model/order";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import * as moment from "moment";
import { DATE_FORMAT } from "../../../../../environments/environment";
import { UsersService } from "../../../users-module/services/users-service/users.service";
import { User } from "../../../users-module/model/user";

import { FormControl } from "@angular/forms";

import { ReplaySubject } from "rxjs";
import { Subject } from "rxjs";
import { take } from "rxjs/operators";
import { takeUntil } from "rxjs/operators";

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
    console.log(JSON.stringify(order));
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getAllUsers() {
    this.usersService.getAllUsers().subscribe(users => (this.users = users));
  }

  private filterUsers() {
    if (!this.users) {
      return;
    }
    // get the search keyword
    let search = this.userFilterCtrl.value;
    if (!search) {
      this.filteredUsers.next(this.users.slice());
      this.getAllUsers();
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the users
    this.filteredUsers.next(
      (this.users = this.users.filter(
        user => user.firstName.toLowerCase().indexOf(search) > -1
      ))
    );

    console.log(
      " filtrowanie " +
        this.filteredUsers.next(
          this.users.filter(
            user => user.firstName.toLowerCase().indexOf(search) > -1
          )
        )
    );
  }

  //to fix pre-select issue https://github.com/angular/material2/issues/8212
  //https://angular.io/api/forms/SelectControlValueAccessor
  compareFn(c1: User, c2: User): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
}
