import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Order } from "../../model/order";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import * as moment from "moment";
import { DATE_FORMAT } from "../../../../../environments/environment";

@Component({
  selector: "app-order-form",
  templateUrl: "./order-form.component.html",
  styleUrls: ["./order-form.component.css"]
})
export class OrderFormComponent implements OnInit {
  orderForm: FormGroup;
  statuses: String[] = ["new", "in progress", "completed", "cancelled"];
  constructor(
    public dialogRef: MatDialogRef<OrderFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Order,
    formBuilder: FormBuilder
  ) {
    data.createdDate = moment(data.createdDate).format(DATE_FORMAT);
    data.dateFrom = moment(data.dateFrom).format(DATE_FORMAT);
    data.dateTo = moment(data.dateTo).format(DATE_FORMAT);
    this.orderForm = formBuilder.group({
      createdDate: data.createdDate,
      dateFrom: data.dateFrom,
      dateTo: data.dateTo,
      status: data.status,
      adultBikes: [Validators.min(1)],
      childBikes: [Validators.min(1)]
    });
  }

  ngOnInit() {}

  save(order: Order) {
    console.log(JSON.stringify(order));
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
