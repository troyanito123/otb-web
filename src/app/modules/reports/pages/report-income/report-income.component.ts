import { Component, OnDestroy } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

import { DatePipe, formatNumber, UpperCasePipe } from '@angular/common'


import { Store } from '@ngrx/store'
import { MonthlyPaymentsMadeActions } from 'src/app/state/actions/monthly-payments-made.action'
import { ContributionsPaidActions } from 'src/app/state/actions/contributions-paid.action'
import { CertificationsActions } from 'src/app/state/actions/certifications.action'
import { FinesActions } from 'src/app/state/actions/fines.actions'
import { ReportActions } from 'src/app/state/actions/reports.action'

import { MonthlyPaymentMade } from 'src/app/models/monthly-payment-made'
import { PDFInput } from 'src/app/services/print-table.service'
import { ContributionPaid } from 'src/app/models/contribution-paid.model'
import { Certification } from 'src/app/models/certification.model'
import { Fine } from 'src/app/models/fine.model'
import { Report } from '../../models/report.interface'
import * as moment from 'moment'

@Component({
  selector: 'app-report-income',
  templateUrl: './report-income.component.html',
  styleUrls: ['./report-income.component.scss'],
})
export class ReportIncomeComponent implements OnDestroy {
  readonly incomes = [
    'MONTHLYPAYMENTS',
    'CONTRIBUTIONS',
    'CERTIFICATIONS',
    'FINES',
    'EXTRA_CONTRIBUTIONS',
    'INCOMES',
  ]

  readonly form: FormGroup

  constructor(
    private fb: FormBuilder,
    private store: Store,
  ) {
    this.form = this.createForm()
  }

  ngOnDestroy(): void {
    this.store.dispatch(MonthlyPaymentsMadeActions.clean())
    this.store.dispatch(ContributionsPaidActions.cleanContributionsPaid())
    this.store.dispatch(CertificationsActions.clean())
    this.store.dispatch(FinesActions.clean())
    this.store.dispatch(ReportActions.clean())
  }

  public generate() {
    if (this.form.invalid) {
      return
    }
    const { income, initDate, endDate } = this.form.value

    switch (income) {
      case this.incomes[0]:
        this.store.dispatch(
          MonthlyPaymentsMadeActions.loadByDate({
            initDate: moment(initDate).startOf('day').toISOString(),
            endDate: moment(endDate).endOf('day').toISOString(),
            handlerCallback: this.generatePdfData
          })
        )
        break

      case this.incomes[1]:
        this.store.dispatch(
          ContributionsPaidActions.loadContributionsPaidByDate({
            initDate: moment(initDate).startOf('day').toISOString(),
            endDate: moment(endDate).endOf('day').toISOString(),
            handlerCallback: this.generatePdfContributionsData,
          })
        )
        break

      case this.incomes[2]:
        this.store.dispatch(
          CertificationsActions.loadByDate({
            initDate: moment(initDate).startOf('day').toISOString(),
            endDate: moment(endDate).endOf('day').toISOString(),
            handlerCallback: this.generatePdfCertificationsData,
          })
        )
        break

      case this.incomes[3]:
        this.store.dispatch(
          FinesActions.loadByDate({
            initDate: moment(initDate).startOf('day').toISOString(),
            endDate: moment(endDate).endOf('day').toISOString(),
            handlerCallback: this.generatePdfFinesData
          })
        )
        break
      case this.incomes[4]:
        this.store.dispatch(
          ReportActions.getExtraContributionReportByDate({
            initDate: moment(initDate).startOf('day').toISOString(),
            endDate: moment(endDate).endOf('day').toISOString(),
            handlerCallback: this.generatePdfIncomeData
          })
        )
        break
      case this.incomes[5]:
        this.store.dispatch(
          ReportActions.getIncomesReportByDate({
            initDate: moment(initDate).startOf('day').toISOString(),
            endDate: moment(endDate).endOf('day').toISOString(),
            handlerCallback: this.generatePdfIncomeData
          })
        )
        break
      default:
        break
    }
  }

  private createForm() {
    return this.fb.group({
      income: [this.incomes[0], Validators.required],
      initDate: [new Date(), Validators.required],
      endDate: [new Date(), Validators.required],
    })
  }

  private generatePdfData(monthlyPaymentsMade: MonthlyPaymentMade[], initDate: string, endDate: string): PDFInput{
    const pipe = new DatePipe('es-Es')
    const upper = new UpperCasePipe()

    const head = [['#', 'FECHA', 'QUIEN PAGÓ', 'CUANTO PAGÓ']]
    const body = monthlyPaymentsMade.map((e, i) => [
      i + 1,
      upper.transform(pipe.transform(e.date, 'EEEE d MMMM, y')),
      e.user.name,
      formatNumber(e.amount, 'es-ES', '1.2'),
    ])
    const count = monthlyPaymentsMade.reduce((counter, item) => counter + item.amount, 0)

    const title = `Reporte de MENSUALIDADES del ${pipe.transform(
      initDate,
      'd MMMM y'
    )} al ${pipe.transform(endDate, 'd MMMM y')}. TOTAL: ${formatNumber(
      count,
      'es-Es',
      '1.2'
    )}`
    return {title, head, body, type: 'INGRESOS'};
  }

  private generatePdfContributionsData(contributionsPaid: ContributionPaid[], initDate: string, endDate: string): PDFInput {
    const pipe = new DatePipe('es-Es')
    const upper = new UpperCasePipe()

    const head = [['#', 'FECHA', 'QUIEN PAGÓ', 'CUANTO PAGÓ']]
    const body = contributionsPaid.map((e, i) => [
      i + 1,
      upper.transform(pipe.transform(e.date, 'EEEE d MMMM, y')),
      e.user.name,
      formatNumber(e.amount, 'es-ES', '1.2'),
    ])
    const count = contributionsPaid.reduce((counter, item) => counter + item.amount, 0)

    const title = `Reporte de APORTES del ${pipe.transform(
      initDate,
      'd MMMM y'
    )} al ${pipe.transform(endDate, 'd MMMM y')}. TOTAL: ${formatNumber(
      count,
      'es-Es',
      '1.2'
    )}`

    return {title, head, body, type: 'APORTES'}
  }

  private generatePdfCertificationsData(certifications: Certification[], initDate: string, endDate: string): PDFInput {
    const pipe = new DatePipe('es-Es')
    const upper = new UpperCasePipe()

    const head = [['#', 'FECHA', 'QUIEN PAGÓ', 'CUANTO PAGÓ']]
    const body = certifications.map((e, i) => [
      i + 1,
      upper.transform(pipe.transform(e.date, 'EEEE d MMMM, y')),
      e.user.name,
      formatNumber(e.amount, 'es-ES', '1.2'),
    ])
    const count = certifications.reduce((counter, item) => counter + item.amount, 0)

    const title = `Reporte de CERTIFICACIONES del ${pipe.transform(
      initDate,
      'd MMMM y'
    )} al ${pipe.transform(endDate, 'd MMMM y')}. TOTAL: ${formatNumber(
      count,
      'es-Es',
      '1.2'
    )}`

    return {title, head, body, type: 'CERTIFICACIONES'}
  }

  private generatePdfIncomeData(report: Report[], initDate: string, endDate: string, reportType = ''): PDFInput {
    const pipe = new DatePipe('es-Es')
    const upper = new UpperCasePipe()

    const head = [['#', 'FECHA', 'QUIEN PAGÓ', 'DESCRIPCION', 'CUANTO PAGÓ']]
    const body = report.map((e, i) => [
      i + 1,
      upper.transform(pipe.transform(e.date, 'EEEE d MMMM, y')),
      e.fromUser,
      e.description,
      formatNumber(e.amount, 'es-ES', '1.2'),
    ])
    const count = report.reduce((counter, item) => counter + item.amount, 0)
    const title = `Reporte de ${reportType} del ${pipe.transform(
      initDate,
      'd MMMM y'
    )} al ${pipe.transform(endDate, 'd MMMM y')}. TOTAL: ${formatNumber(
      count,
      'es-Es',
      '1.2'
    )}`
    return {title, head, body, type: reportType}
  }

  private generatePdfFinesData(fines: Fine[], initDate: string, endDate: string): PDFInput {
    const pipe = new DatePipe('es-Es')
    const upper = new UpperCasePipe()

    const head = [['#', 'FECHA', 'QUIEN PAGÓ', 'CUANTO PAGÓ']]
    const body = fines.map((e, i) => [
      i + 1,
      upper.transform(pipe.transform(e.date, 'EEEE d MMMM, y')),
      e.user.name,
      formatNumber(e.fine_paid, 'es-ES', '1.2'),
    ])
    const count = fines.reduce((counter, item) => counter + item.fine_paid, 0)

    const title = `Reporte de MULTAS del ${pipe.transform(
      initDate,
      'd MMMM y'
    )} al ${pipe.transform(endDate, 'd MMMM y')}. TOTAL: ${formatNumber(
      count,
      'es-Es',
      '1.2'
    )}`

    return {title, head, body, type: 'MULTAS'}
  }
}
