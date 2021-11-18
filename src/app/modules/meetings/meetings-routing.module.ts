import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MeetingsComponent } from './meetings.component';
import { MeetingEditComponent } from './pages/meeting-edit/meeting-edit.component';
import { MeetingListComponent } from './pages/meeting-list/meeting-list.component';
import { MeetingNewComponent } from './pages/meeting-new/meeting-new.component';
import { MeetingViewComponent } from './pages/meeting-view/meeting-view.component';

const routes: Routes = [
  {
    path: '',
    component: MeetingsComponent,
    children: [
      { path: 'list', component: MeetingListComponent },
      { path: 'new', component: MeetingNewComponent },
      { path: 'edit', component: MeetingEditComponent },
      { path: ':id', component: MeetingViewComponent },
      { path: '', redirectTo: 'list' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MeetingsRoutingModule {}
