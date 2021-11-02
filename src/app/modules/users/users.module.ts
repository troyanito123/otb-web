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
import { UserPaymentComponent } from './pages/user-payment/user-payment.component';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { UserPaidPrintComponent } from './components/user-paid-print/user-paid-print.component';
import { UserReceiptComponent } from './components/user-receipt/user-receipt.component';
import { QRCodeModule } from 'angular2-qrcode';

@NgModule({
  declarations: [
    UsersComponent,
    UserListComponent,
    UserEditComponent,
    UserViewComponent,
    UserNewComponent,
    UserFormComponent,
    UserItemComponent,
    UserPaymentComponent,
    UserPaidPrintComponent,
    UserReceiptComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    ReactiveFormsModule,
    PipesModule,
    QRCodeModule,
  ],
})
export class UsersModule {}
