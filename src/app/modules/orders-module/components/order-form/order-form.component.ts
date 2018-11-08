import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Order } from "../../model/order";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-order-form",
  templateUrl: "./order-form.component.html",
  styleUrls: ["./order-form.component.css"]
})
export class OrderFormComponent implements OnInit {
  orderForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<OrderFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Order,
    formBuilder: FormBuilder
  ) {
    this.orderForm = formBuilder.group({
      dateFrom: data.dateFrom,
      adultBikes: [Validators.min(1)]
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
