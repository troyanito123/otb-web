import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExtraContributionsRoutingModule } from './extra-contributions-routing.module';
import { ExtraContributionsComponent } from './extra-contributions.component';
import { ExtraContributionsListComponent } from './pages/extra-contributions-list/extra-contributions-list.component';
import { ExtraContributionsNewComponent } from './pages/extra-contributions-new/extra-contributions-new.component';
import { ExtraContributionsViewComponent } from './pages/extra-contributions-view/extra-contributions-view.component';
import { ExtraContributionsEditComponent } from './pages/extra-contributions-edit/extra-contributions-edit.component';
import { ExtraContributionsDetailComponent } from './pages/extra-contributions-detail/extra-contributions-detail.component';
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { ExtraContributionFormComponent } from './components/form/extra-contribution-form.component';

@NgModule({
  declarations: [
    ExtraContributionsComponent,
    ExtraContributionsListComponent,
    ExtraContributionsNewComponent,
    ExtraContributionsViewComponent,
    ExtraContributionsEditComponent,
    ExtraContributionsDetailComponent,
    ExtraContributionFormComponent,
  ],
  imports: [
    CommonModule,
    ExtraContributionsRoutingModule,
    AngularMaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
  ],
})
export class ExtraContributionsModule {}
