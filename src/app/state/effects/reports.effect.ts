import { Injectable } from '@angular/core';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as ReportActions from '../actions/reports.action';

import { ExtraContributionService } from '@services/extra-contribution.service';
import { IncomeService } from '@services/income.service';

@Injectable()
export class ReportEffect {
  constructor(
    private actions$: Actions,
    private extraContributionService: ExtraContributionService,
    private incomeService: IncomeService
  ) {}

  getExtraContributionReport$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReportActions.getExtraContributionReportByDate),
      mergeMap(({ initDate, endDate }) =>
        this.extraContributionService.getReportByDate(initDate, endDate).pipe(
          map((report) =>
            ReportActions.getExtraContributionReportByDateSuccess({ report })
          ),
          catchError((e) => of(ReportActions.setError({ e })))
        )
      )
    )
  );
  getIncomeReport$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReportActions.getIncomesReportByDate),
      mergeMap(({ initDate, endDate }) =>
        this.incomeService.getReportByDate(initDate, endDate).pipe(
          map((report) =>
            ReportActions.getIncomesReportByDateSuccess({ report })
          ),
          catchError((e) => of(ReportActions.setError({ e })))
        )
      )
    )
  );
}
