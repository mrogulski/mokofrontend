import { Component, OnInit, ViewChild, Input } from "@angular/core";
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { Order } from "../../model/order";
import { OrderService } from "../../services/order-service/order.service";
import { MatDialog } from "@angular/material";
import { OrderFormComponent } from "../order-form/order-form.component";

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
    "id",
    "createdDate",
    "status",
    "rentalDate",
    "bikes",
    "additions",
    "pickup",
    "price",
    // "user",
    "edit"
  ];
  dataSource: MatTableDataSource<Order>;

  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;

  constructor(private orderService: OrderService, public dialog: MatDialog) {
    //https://stackoverflow.com/questions/49446816/angular-5-material-http-data-with-pagination - do paginacji
    //https://blog.angular-university.io/angular-material-data-table/
  }

  ngOnInit() {
    this.getData();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  complete(order: Order): void {
    this.orderService.complete(order).subscribe(response => {
      console.log("completed rorder " + response);
      this.getData();
    });
    console.log("order " + order.id + " completed");
  }

  edit(order: Order): void {
    console.log("editing order numvber " + JSON.stringify(order));
    const dialogRef = this.dialog.open(OrderFormComponent, {
      data: order
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //   this.order = result;
    // });
  }
  cancel(orderID: number): void {
    this.orderService.cancel(orderID).subscribe(response => {
      this.getData();
    });
    console.log("order " + orderID + " cancelled");
  }

  getData(): void {
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
}
