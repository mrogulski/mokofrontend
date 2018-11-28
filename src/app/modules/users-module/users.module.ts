import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UsersComponent } from "./components/users/users.component";
import { UserFormComponent } from "./components/user-form/user-form.component";
import { MatInputModule, MatButtonModule } from "@angular/material";
import { MatDialogModule } from "@angular/material/dialog";

@NgModule({
  imports: [CommonModule, MatInputModule, MatButtonModule, MatDialogModule],
  declarations: [UsersComponent, UserFormComponent],
  entryComponents: [UserFormComponent]
})
export class UsersModule {}
