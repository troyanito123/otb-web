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
import { UserPrePaymentComponent } from './components/user-pre-payment/user-pre-payment.component';
import { QRCodeModule } from 'angular2-qrcode';
import { UserContributionComponent } from './pages/user-contribution/user-contribution.component';
import { UserDetailComponent } from './pages/user-detail/user-detail.component';
import { UserReceiptViewComponent } from './pages/user-receipt-view/user-receipt-view.component';
import { UserCertificationsComponent } from './pages/user-certifications/user-certifications.component';
import { UserAttendencesComponent } from './pages/user-attendences/user-attendences.component';
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';
import { UserFinesComponent } from './pages/user-fines/user-fines.component';
import { UserBlockComponent } from './pages/user-block/user-block.component';
import { UserAllBlocksComponent } from './pages/user-all-blocks/user-all-blocks.component';
import { UserExtraContributionComponent } from './pages/user-extra-contribution/user-extra-contribution.component';
import { UserIncomesComponent } from './pages/user-incomes/user-incomes.component';
import { UserIncomesCreateComponent } from './pages/user-incomes/user-incomes-create/user-incomes-create.component';
import { UserIncomesListComponent } from './pages/user-incomes/user-incomes-list/user-incomes-list.component';

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
    UserPrePaymentComponent,
    UserContributionComponent,
    UserDetailComponent,
    UserReceiptViewComponent,
    UserCertificationsComponent,
    UserAttendencesComponent,
    UserFinesComponent,
    UserBlockComponent,
    UserAllBlocksComponent,
    UserExtraContributionComponent,
    UserIncomesComponent,
    UserIncomesCreateComponent,
    UserIncomesListComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    ReactiveFormsModule,
    PipesModule,
    QRCodeModule,
    AngularMaterialModule,
  ],
})
export class UsersModule {}
