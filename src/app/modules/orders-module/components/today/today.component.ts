import { Component, OnInit } from "@angular/core";

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

  constructor() {}

  ngOnInit() {
    this.date = new Date();
    this.rentBikes = 2;
    this.availableBikes = 10;
    this.todaysOrders = 12;
  }
}
