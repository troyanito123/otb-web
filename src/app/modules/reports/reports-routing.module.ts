import { NgModule, inject } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterModule,
  RouterStateSnapshot,
  Routes,
} from '@angular/router'
import { ReportAttendencesComponent } from './pages/report-attendences/report-attendences.component'
import { ReportExpensesComponent } from './pages/report-expenses/report-expenses.component'
import { ReportIncomeComponent } from './pages/report-income/report-income.component'
import { ReportsComponent } from './reports.component'
import { Meeting } from '@models/meeting.model'
import { MeetingService } from '@services/meeting.service'
import { ReportListFormatComponent } from './pages/report-list-format/report-list-format.component'

const reportAttendanceResolver: ResolveFn<Meeting[]> = () => {
  return inject(MeetingService).getAll()
}

const routes: Routes = [
  {
    path: '',
    component: ReportsComponent,
    children: [
      {
        path: 'attendences',
        component: ReportAttendencesComponent,
        resolve: { meetings: reportAttendanceResolver },
      },
      { path: 'expenses', component: ReportExpensesComponent },
      { path: 'income', component: ReportIncomeComponent },
      { path: 'lists', component: ReportListFormatComponent },
      { path: '', redirectTo: 'attendences', pathMatch: 'full' },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportsRoutingModule {}
