import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { OrderFormComponent } from "../order-form/order-form.component";
import { Order } from "../../model/order";
import * as moment from "moment";
import { DATE_FORMAT } from "../../../../../environments/environment";

@Component({
  selector: "app-today",
  templateUrl: "./today.component.html",
  styleUrls: ["./today.component.css"]
})
export class TodayComponent implements OnInit {
  date: Date;
  rentBikes: number;
  availableBikes: number;
  todaysOrders: number;
  order: Order = {
    id: null,
    status: null,
    createdDate: null,
    dateFrom: null,
    dateTo: null,
    user: null,
    adultBike: null,
    childBike: null,
    helmet: null,
    lock: null,
    pickup: null,
    pickupFrom: null,
    pickupTo: null,
    pickupDistance: null,
    pickupValue: null,
    initialValue: null,
    finalValue: null
  };

  constructor(public dialog: MatDialog) {}

  ngOnInit() {
    this.date = new Date();
    this.rentBikes = 2;
    this.availableBikes = 10;
    this.todaysOrders = 12;
  }

  newOrder() {
    this.order.status = "new";
    this.order.createdDate = moment().format(DATE_FORMAT);
    const dialogRef = this.dialog.open(OrderFormComponent, {
      data: this.order
    });
  }
}
