import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExtraContributionsComponent } from './extra-contributions.component';
import { ExtraContributionsDetailComponent } from './pages/extra-contributions-detail/extra-contributions-detail.component';
import { ExtraContributionsEditComponent } from './pages/extra-contributions-edit/extra-contributions-edit.component';
import { ExtraContributionsListComponent } from './pages/extra-contributions-list/extra-contributions-list.component';
import { ExtraContributionsNewComponent } from './pages/extra-contributions-new/extra-contributions-new.component';
import { ExtraContributionsViewComponent } from './pages/extra-contributions-view/extra-contributions-view.component';

const routes: Routes = [
  {
    path: '',
    component: ExtraContributionsComponent,
    children: [
      { path: 'list', component: ExtraContributionsListComponent },
      { path: 'new', component: ExtraContributionsNewComponent },
      {
        path: ':id',
        component: ExtraContributionsViewComponent,
        children: [
          { path: 'detail', component: ExtraContributionsDetailComponent },
          { path: 'edit', component: ExtraContributionsEditComponent },
          { path: '', redirectTo: 'detail' },
        ],
      },
      { path: '', redirectTo: 'list' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExtraContributionsRoutingModule {}
