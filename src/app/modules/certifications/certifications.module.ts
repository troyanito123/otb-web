import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CertificationsRoutingModule } from './certifications-routing.module';
import { CertificationsComponent } from './certifications.component';
import { CertificationListComponent } from './pages/certification-list/certification-list.component';
import { CertificationEditComponent } from './pages/certification-edit/certification-edit.component';
import { CertificationViewComponent } from './pages/certification-view/certification-view.component';
import { CertificationDetailComponent } from './pages/certification-detail/certification-detail.component';
import { CertificationFormComponent } from './components/certification-form/certification-form.component';
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CertificationsComponent,
    CertificationListComponent,
    CertificationEditComponent,
    CertificationViewComponent,
    CertificationDetailComponent,
    CertificationFormComponent,
  ],
  imports: [
    CommonModule,
    CertificationsRoutingModule,
    AngularMaterialModule,
    PipesModule,
    ReactiveFormsModule,
  ],
})
export class CertificationsModule {}
