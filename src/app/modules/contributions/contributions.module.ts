import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContributionsRoutingModule } from './contributions-routing.module';
import { ContributionListComponent } from './pages/contribution-list/contribution-list.component';
import { ContributionNewComponent } from './pages/contribution-new/contribution-new.component';
import { ContributionEditComponent } from './pages/contribution-edit/contribution-edit.component';
import { ContributionViewComponent } from './pages/contribution-view/contribution-view.component';
import { ContributionDetailComponent } from './pages/contribution-detail/contribution-detail.component';
import { ContributionFormComponent } from './components/contribution-form/contribution-form.component';
import { ContributionSingleComponent } from './components/contribution-single/contribution-single.component';
import { ContributionsComponent } from './contributions.component';
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ContributionListComponent,
    ContributionNewComponent,
    ContributionEditComponent,
    ContributionViewComponent,
    ContributionDetailComponent,
    ContributionFormComponent,
    ContributionSingleComponent,
    ContributionsComponent,
  ],
  imports: [
    CommonModule,
    ContributionsRoutingModule,
    AngularMaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
  ],
})
export class ContributionsModule {}
