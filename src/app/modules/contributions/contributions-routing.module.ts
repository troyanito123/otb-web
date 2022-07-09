import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContributionsComponent } from './contributions.component';
import { ContributionDetailComponent } from './pages/contribution-detail/contribution-detail.component';
import { ContributionEditComponent } from './pages/contribution-edit/contribution-edit.component';
import { ContributionListComponent } from './pages/contribution-list/contribution-list.component';
import { ContributionNewComponent } from './pages/contribution-new/contribution-new.component';
import { ContributionViewComponent } from './pages/contribution-view/contribution-view.component';

const routes: Routes = [
  {
    path: '',
    component: ContributionsComponent,
    children: [
      { path: 'list', component: ContributionListComponent },
      { path: 'new', component: ContributionNewComponent },
      {
        path: ':id',
        component: ContributionViewComponent,
        children: [
          { path: 'edit', component: ContributionEditComponent },
          { path: 'detail', component: ContributionDetailComponent },
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
export class ContributionsRoutingModule {}
