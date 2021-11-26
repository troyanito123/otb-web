import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CertificationsComponent } from './certifications.component';
import { CertificationDetailComponent } from './pages/certification-detail/certification-detail.component';
import { CertificationEditComponent } from './pages/certification-edit/certification-edit.component';
import { CertificationListComponent } from './pages/certification-list/certification-list.component';
import { CertificationViewComponent } from './pages/certification-view/certification-view.component';

const routes: Routes = [
  {
    path: '',
    component: CertificationsComponent,
    children: [
      { path: 'list', component: CertificationListComponent },
      {
        path: ':id',
        component: CertificationViewComponent,
        children: [
          { path: 'detail', component: CertificationDetailComponent },
          { path: 'edit', component: CertificationEditComponent },
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
export class CertificationsRoutingModule {}
