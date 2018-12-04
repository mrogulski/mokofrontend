import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UsersComponent } from "./components/users/users.component";
import { UserFormComponent } from "./components/user-form/user-form.component";
import { MatInputModule, MatButtonModule } from "@angular/material";
import { MatDialogModule } from "@angular/material/dialog";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UsersTableComponent } from "./components/users-table/users-table.component";
import { Ng2SearchPipeModule } from "ng2-search-filter";
import { Ng2OrderModule } from "ng2-order-pipe";
import { NgxPaginationModule } from "ngx-pagination";

@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    Ng2OrderModule,
    NgxPaginationModule
  ],
  declarations: [UsersComponent, UserFormComponent, UsersTableComponent],
  entryComponents: [UserFormComponent]
})
export class UsersModule {}
