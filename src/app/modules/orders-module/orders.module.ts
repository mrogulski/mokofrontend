import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { OrdersComponent } from "./components/orders/orders.component";
import { MatTableModule } from "@angular/material/table";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatInputModule } from "@angular/material";
import { OrdersTableComponent } from "./components/orders-table/orders-table.component";
import { MatSortModule } from "@angular/material/sort";

@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    MatSortModule
  ],
  declarations: [OrdersComponent, OrdersTableComponent]
})
export class OrdersModule {}
