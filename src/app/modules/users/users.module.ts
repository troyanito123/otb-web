import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { UserEditComponent } from './pages/user-edit/user-edit.component';
import { UserViewComponent } from './pages/user-view/user-view.component';
import { UserNewComponent } from './pages/user-new/user-new.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserItemComponent } from './components/user-item/user-item.component';

@NgModule({
  declarations: [
    UsersComponent,
    UserListComponent,
    UserEditComponent,
    UserViewComponent,
    UserNewComponent,
    UserFormComponent,
    UserItemComponent,
  ],
  imports: [CommonModule, UsersRoutingModule, ReactiveFormsModule],
})
export class UsersModule {}
