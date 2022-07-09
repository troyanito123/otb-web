import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
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
      {
        path: 'new',
        component: ExtraContributionsNewComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ADMIN'] },
      },
      {
        path: ':id',
        component: ExtraContributionsViewComponent,
        children: [
          { path: 'detail', component: ExtraContributionsDetailComponent },
          {
            path: 'edit',
            component: ExtraContributionsEditComponent,
            canActivate: [AuthGuard],
            data: { roles: ['ADMIN'] },
          },
          { path: '', redirectTo: 'detail', pathMatch: 'full' },
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
export class ExtraContributionsRoutingModule {}
