import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { OrderFormComponent } from "../order-form/order-form.component";
import { Order } from "../../model/order";
import * as moment from "moment";
import { DATE_FORMAT } from "../../../../../environments/environment";
import { OrderService } from "../../services/order-service/order.service";
import { SAVE_DATE_FORMAT } from "../../../../../environments/environment";

@Component({
  selector: "app-today",
  templateUrl: "./today.component.html",
  styleUrls: ["./today.component.css"]
})
export class TodayComponent implements OnInit {
  date: Date;
  bikesTotal: Number;
  rentChildBikes: Number;
  rentAdultBikes: Number;
  availableChildBikes: Number;
  availableAdultBikes: Number;
  childBikesTotal: Number;
  adultBikesTotal: Number;
  todaysOrders: Number;
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
  start = moment()
    .startOf("day")
    .format(SAVE_DATE_FORMAT);
  end = moment()
    .endOf("day")
    .format(SAVE_DATE_FORMAT);

  constructor(public dialog: MatDialog, private orderService: OrderService) {}

  ngOnInit() {
    this.date = new Date();
    this.todaysOrders = 12;
    this.orderService
      .getAvailableBikes(this.start, this.end, "CHILD")
      .subscribe(data => {
        this.availableChildBikes = data;
      });
    this.orderService
      .getAvailableBikes(this.start, this.end, "ADULT")
      .subscribe(data => {
        this.availableAdultBikes = data;
      });
    this.orderService
      .getBikesTotal()
      .subscribe(data => (this.bikesTotal = data));
    this.orderService
      .getBikesTotal("CHILD")
      .subscribe(data => (this.childBikesTotal = data));
    this.orderService
      .getBikesTotal("ADULT")
      .subscribe(data => (this.adultBikesTotal = data));
  }

  newOrder() {
    this.order.status = "new";
    this.order.createdDate = moment().format(DATE_FORMAT);
    const dialogRef = this.dialog.open(OrderFormComponent, {
      data: this.order
    });
  }
}
