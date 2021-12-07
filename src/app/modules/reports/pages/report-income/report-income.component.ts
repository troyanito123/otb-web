import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DatePipe, formatNumber, UpperCasePipe } from '@angular/common';

import { Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.reducer';
import * as MonthlyPaymentsMade from 'src/app/state/actions/monthly-payments-made.action';
import * as ContributionsPaidActions from 'src/app/state/actions/contributions-paid.action';
import * as CertificationsActions from 'src/app/state/actions/certifications.action';
import * as FinesActions from 'src/app/state/actions/fines.actions';

import { MonthlyPaymentMade } from 'src/app/models/monthly-payment-made';
import { PrintTableService } from 'src/app/services/print-table.service';
import { ContributionPaid } from 'src/app/models/contribution-paid.model';
import { Certification } from 'src/app/models/certification.model';
import { Fine } from 'src/app/models/fine.model';

@Component({
  selector: 'app-report-income',
  templateUrl: './report-income.component.html',
  styleUrls: ['./report-income.component.scss'],
})
export class ReportIncomeComponent implements OnInit, OnDestroy {
  incomes = ['MONTHLYPAYMENTS', 'CONTRIBUTIONS', 'CERTIFICATIONS', 'FINES'];

  public form!: FormGroup;

  private monthlyPaymentsMadeSubs!: Subscription;
  private contributionsPaidSubs!: Subscription;
  private certifcationsSubs!: Subscription;
  private finesSubs!: Subscription;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private printTableService: PrintTableService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.monthlyPaymentsMadeSubs = this.store
      .select('monthlyPaymentMade')
      .subscribe(({ monthlyPaymentsMade, loaded }) => {
        if (loaded) {
          this.generatePdf(monthlyPaymentsMade);
        }
      });

    this.contributionsPaidSubs = this.store
      .select('contributionsPaid')
      .subscribe(({ contributionsPaid, loaded }) => {
        if (loaded) {
          this.generatePdfContributions(contributionsPaid);
        }
      });

    this.certifcationsSubs = this.store
      .select('certifications')
      .subscribe(({ certifications, loaded }) => {
        if (loaded) {
          this.generatePdfCertificationes(certifications);
        }
      });

    this.finesSubs = this.store
      .select('fines')
      .subscribe(({ fines, loaded }) => {
        if (loaded) {
          this.generatePdfFines(fines);
        }
      });
  }

  ngOnDestroy(): void {
    this.store.dispatch(MonthlyPaymentsMade.clean());
    this.store.dispatch(ContributionsPaidActions.cleanContributionsPaid());
    this.store.dispatch(CertificationsActions.clean());
    this.store.dispatch(FinesActions.clean());

    this.monthlyPaymentsMadeSubs?.unsubscribe();
    this.contributionsPaidSubs?.unsubscribe();
    this.certifcationsSubs?.unsubscribe();
    this.finesSubs?.unsubscribe();
  }

  public generate() {
    if (this.form.invalid) {
      return;
    }
    const { income, initDate, endDate } = this.form.value;

    switch (income) {
      case this.incomes[0]:
        this.store.dispatch(
          MonthlyPaymentsMade.loadByDate({
            initDate: this.transformDate(initDate),
            endDate: this.transformDate(endDate),
          })
        );
        break;

      case this.incomes[1]:
        this.store.dispatch(
          ContributionsPaidActions.loadContributionsPaidByDate({
            initDate: this.transformDate(initDate),
            endDate: this.transformDate(endDate),
          })
        );
        break;

      case this.incomes[2]:
        this.store.dispatch(
          CertificationsActions.loadByDate({
            initDate: this.transformDate(initDate),
            endDate: this.transformDate(endDate),
          })
        );
        break;

      case this.incomes[3]:
        this.store.dispatch(
          FinesActions.loadByDate({
            initDate: this.transformDate(initDate),
            endDate: this.transformDate(endDate),
          })
        );
        break;

      default:
        break;
    }
  }

  private createForm() {
    this.form = this.fb.group({
      income: [this.incomes[0], Validators.required],
      initDate: [new Date(), Validators.required],
      endDate: [new Date(), Validators.required],
    });
  }

  private generatePdf(monthlyPaymentsMade: MonthlyPaymentMade[]) {
    const pipe = new DatePipe('es-Es');
    const upper = new UpperCasePipe();

    const head = [['#', 'FECHA', 'QUIEN PAGÓ', 'CUANTO PAGÓ']];
    const data = monthlyPaymentsMade.map((e, i) => [
      i + 1,
      upper.transform(pipe.transform(e.date, 'EEEE d MMMM, y')),
      e.user.name,
      formatNumber(e.amount, 'es-ES', '1.2'),
    ]);
    const count = monthlyPaymentsMade.reduce(
      (counter, item) => counter + item.amount,
      0
    );

    const title = `Reporte de MENSUALIDADES del ${pipe.transform(
      this.form.value.initDate,
      'd MMMM y'
    )} al ${pipe.transform(
      this.form.value.endDate,
      'd MMMM y'
    )}. TOTAL: ${formatNumber(count, 'es-Es', '1.2')}`;

    this.printTableService.generatePdf(title, head, data, 'INGRESOS');
  }

  private generatePdfContributions(contributionsPaid: ContributionPaid[]) {
    const pipe = new DatePipe('es-Es');
    const upper = new UpperCasePipe();

    const head = [['#', 'FECHA', 'QUIEN PAGÓ', 'CUANTO PAGÓ']];
    const data = contributionsPaid.map((e, i) => [
      i + 1,
      upper.transform(pipe.transform(e.date, 'EEEE d MMMM, y')),
      e.user.name,
      formatNumber(e.amount, 'es-ES', '1.2'),
    ]);
    const count = contributionsPaid.reduce(
      (counter, item) => counter + item.amount,
      0
    );

    const title = `Reporte de APORTES del ${pipe.transform(
      this.form.value.initDate,
      'd MMMM y'
    )} al ${pipe.transform(
      this.form.value.endDate,
      'd MMMM y'
    )}. TOTAL: ${formatNumber(count, 'es-Es', '1.2')}`;

    this.printTableService.generatePdf(title, head, data, 'APORTES');
  }

  private generatePdfCertificationes(certifications: Certification[]) {
    const pipe = new DatePipe('es-Es');
    const upper = new UpperCasePipe();

    const head = [['#', 'FECHA', 'QUIEN PAGÓ', 'CUANTO PAGÓ']];
    const data = certifications.map((e, i) => [
      i + 1,
      upper.transform(pipe.transform(e.date, 'EEEE d MMMM, y')),
      e.user.name,
      formatNumber(e.amount, 'es-ES', '1.2'),
    ]);
    const count = certifications.reduce(
      (counter, item) => counter + item.amount,
      0
    );

    const title = `Reporte de CERTIFICACIONES del ${pipe.transform(
      this.form.value.initDate,
      'd MMMM y'
    )} al ${pipe.transform(
      this.form.value.endDate,
      'd MMMM y'
    )}. TOTAL: ${formatNumber(count, 'es-Es', '1.2')}`;

    this.printTableService.generatePdf(title, head, data, 'CERTIFICACIONES');
  }

  private generatePdfFines(fines: Fine[]) {
    const pipe = new DatePipe('es-Es');
    const upper = new UpperCasePipe();

    const head = [['#', 'FECHA', 'QUIEN PAGÓ', 'CUANTO PAGÓ']];
    const data = fines.map((e, i) => [
      i + 1,
      upper.transform(pipe.transform(e.date, 'EEEE d MMMM, y')),
      e.user.name,
      formatNumber(e.fine_paid, 'es-ES', '1.2'),
    ]);
    const count = fines.reduce((counter, item) => counter + item.fine_paid, 0);

    const title = `Reporte de MULTAS del ${pipe.transform(
      this.form.value.initDate,
      'd MMMM y'
    )} al ${pipe.transform(
      this.form.value.endDate,
      'd MMMM y'
    )}. TOTAL: ${formatNumber(count, 'es-Es', '1.2')}`;

    this.printTableService.generatePdf(title, head, data, 'MULTAS');
  }

  private transformDate(date: Date) {
    const isoDate = date.toISOString();
    const auxDate = isoDate.split('-');
    return `${auxDate[0]}-${auxDate[1]}-${auxDate[2].slice(0, 2)}`;
  }
}
