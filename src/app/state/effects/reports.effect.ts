import { Injectable } from '@angular/core'
import { mergeMap, map, catchError, tap } from 'rxjs/operators'
import { of } from 'rxjs'

import { Actions, createEffect, ofType } from '@ngrx/effects'

import { ReportActions } from '../actions/reports.action'

import { ExtraContributionService } from '@services/extra-contribution.service'
import { IncomeService } from '@services/income.service'
import { PrintTableService } from '@services/print-table.service'

@Injectable()
export class ReportEffect {
  constructor(
    private actions$: Actions,
    private extraContributionService: ExtraContributionService,
    private incomeService: IncomeService,
    private printTableService: PrintTableService
  ) {}

  getExtraContributionReport$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReportActions.getExtraContributionReportByDate),
      mergeMap(({ initDate, endDate, handlerCallback }) =>
        this.extraContributionService.getReportByDate(initDate, endDate).pipe(
          tap((report) => {
            this.printTableService.generatePdf(
              handlerCallback(report, initDate, endDate, 'APORTES EXTRAS')
            )
          }),
          map((report) => ReportActions.getExtraContributionReportByDateSuccess({ report })),
          catchError((e) => of(ReportActions.setError({ e })))
        )
      )
    )
  )
  getIncomeReport$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReportActions.getIncomesReportByDate),
      mergeMap(({ initDate, endDate, handlerCallback }) =>
        this.incomeService.getReportByDate(initDate, endDate).pipe(
          tap((report) => {
            this.printTableService.generatePdf(
              handlerCallback(report, initDate, endDate, 'INGRESOS EXTRAS')
            )
          }),
          map((report) => ReportActions.getIncomesReportByDateSuccess({ report })),
          catchError((e) => of(ReportActions.setError({ e })))
        )
      )
    )
  )
}
