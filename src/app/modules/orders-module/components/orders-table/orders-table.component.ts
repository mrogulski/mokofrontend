import { Component, OnInit, ViewChild, Input } from "@angular/core";
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { Order } from "../../model/order";
import { OrderService } from "../../services/order-service/order.service";

@Component({
  selector: "app-orders-table",
  templateUrl: "./orders-table.component.html",
  styleUrls: ["./orders-table.component.css"]
})
export class OrdersTableComponent implements OnInit {
  @Input()
  excludeStatus: string;
  @Input()
  title: string;

  displayedColumns: string[] = [
    "createdDate",
    "status",
    "rentalDate",
    "bikes",
    "additions",
    "pickup",
    "price",
    "user",
    "edit"
  ];
  dataSource: MatTableDataSource<Order>;

  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;

  constructor(private orderService: OrderService) {
    //https://stackoverflow.com/questions/49446816/angular-5-material-http-data-with-pagination - do paginacji
    //https://blog.angular-university.io/angular-material-data-table/
  }

  ngOnInit() {
    this.orderService.getAllOrders().subscribe(orders => {
      if (this.excludeStatus == undefined) {
        orders = orders.filter(
          order => order.status === "completed" || order.status === "cancelled"
        );
      } else {
        orders = orders
          .filter(order => order.status != this.excludeStatus)
          .filter(order => order.status != "cancelled");
      }

      this.dataSource = new MatTableDataSource(orders);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  complete(orderID: number): void {
    console.log("order " + orderID + " completed");
  }

  edit(order: Order): void {
    console.log("editing order numvber " + order.id);
  }
  cancel(orderID: number): void {
    console.log("order " + orderID + " cancelled");
  }
}
