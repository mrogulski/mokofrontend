import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { OrdersComponent } from "./components/orders/orders.component";
import { MatTableModule } from "@angular/material/table";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatInputModule, MatButtonModule } from "@angular/material";
import { OrdersTableComponent } from "./components/orders-table/orders-table.component";
import { MatSortModule } from "@angular/material/sort";
import { MatToolbarModule } from "@angular/material/toolbar";
import { TodayComponent } from "./components/today/today.component";
import { NewOrderComponent } from "./components/new-order/new-order.component";
import { AngularFontAwesomeModule } from "angular-font-awesome";

@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    MatSortModule,
    MatToolbarModule,
    MatButtonModule,
    AngularFontAwesomeModule
  ],
  declarations: [
    OrdersComponent,
    OrdersTableComponent,
    TodayComponent,
    NewOrderComponent
  ]
})
export class OrdersModule {}
