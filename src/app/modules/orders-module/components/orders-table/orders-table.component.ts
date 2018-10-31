import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { Order } from "../../model/order";
import { OrderService } from "../../services/order-service/order.service";

@Component({
  selector: "app-orders-table",
  templateUrl: "./orders-table.component.html",
  styleUrls: ["./orders-table.component.css"]
})
export class OrdersTableComponent implements OnInit {
  displayedColumns: string[] = ["id", "status"];
  dataSource: MatTableDataSource<Order>;
  orders;

  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;

  constructor(private orderService: OrderService) {
    // pobrac zamowienia(narazie wszytskie)
    //https://stackoverflow.com/questions/49446816/angular-5-material-http-data-with-pagination - do paginacji
    //https://blog.angular-university.io/angular-material-data-table/
    // Assign the data to the data source for the table to render
  }

  ngOnInit() {
    this.orderService
      .getAllOrders()
      .subscribe(orders => (this.orders = orders));

    this.dataSource = new MatTableDataSource(this.orders);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
