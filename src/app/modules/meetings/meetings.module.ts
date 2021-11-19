import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MeetingsRoutingModule } from './meetings-routing.module';
import { MeetingNewComponent } from './pages/meeting-new/meeting-new.component';
import { MeetingViewComponent } from './pages/meeting-view/meeting-view.component';
import { MeetingEditComponent } from './pages/meeting-edit/meeting-edit.component';
import { MeetingListComponent } from './pages/meeting-list/meeting-list.component';
import { MeetingFormComponent } from './components/meeting-form/meeting-form.component';
import { MeetingSingleComponent } from './components/meeting-single/meeting-single.component';
import { MeetingsComponent } from './meetings.component';
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MeetingDetailComponent } from './pages/meeting-detail/meeting-detail.component';

@NgModule({
  declarations: [
    MeetingNewComponent,
    MeetingViewComponent,
    MeetingEditComponent,
    MeetingListComponent,
    MeetingFormComponent,
    MeetingSingleComponent,
    MeetingsComponent,
    MeetingDetailComponent,
  ],
  imports: [
    CommonModule,
    MeetingsRoutingModule,
    AngularMaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
  ],
})
export class MeetingsModule {}
