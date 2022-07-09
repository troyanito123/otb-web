import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MeetingsComponent } from './meetings.component';
import { MeetingDetailComponent } from './pages/meeting-detail/meeting-detail.component';
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

      {
        path: ':id',
        component: MeetingViewComponent,
        children: [
          { path: 'view', component: MeetingDetailComponent },
          { path: 'edit', component: MeetingEditComponent },
          { path: '', redirectTo: 'view', pathMatch: 'full' },
        ],
      },

      { path: '', redirectTo: 'list', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MeetingsRoutingModule {}
