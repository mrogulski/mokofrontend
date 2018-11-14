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
import { MatDialogModule } from "@angular/material/dialog";
import { TodayComponent } from "./components/today/today.component";
import { NewOrderComponent } from "./components/new-order/new-order.component";
import { AngularFontAwesomeModule } from "angular-font-awesome";
import { OrderFormComponent } from "./components/order-form/order-form.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatSelectModule } from "@angular/material/select";
import { NgxMatSelectSearchModule } from "ngx-mat-select-search";

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
    MatDialogModule,
    AngularFontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    NgxMatSelectSearchModule
  ],
  declarations: [
    OrdersComponent,
    OrdersTableComponent,
    TodayComponent,
    NewOrderComponent,
    OrderFormComponent
  ],
  entryComponents: [OrderFormComponent]
})
export class OrdersModule {}
