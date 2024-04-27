import { Component, OnDestroy, OnInit } from '@angular/core'
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms'

import { DatePipe, formatNumber, UpperCasePipe } from '@angular/common'

import { Subscription } from 'rxjs'

import { Store } from '@ngrx/store'
import { AppState } from 'src/app/state/app.reducer'
import { MonthlyPaymentMadeActions } from 'src/app/state/actions/monthly-payments-made.action'
import { ContributionsPaidActions } from 'src/app/state/actions/contributions-paid.action'
import * as CertificationsActions from 'src/app/state/actions/certifications.action'
import { FinesActions } from 'src/app/state/actions/fines.actions'
import * as ReportActions from 'src/app/state/actions/reports.action'

import { MonthlyPaymentMade } from 'src/app/models/monthly-payment-made'
import { PrintTableService } from 'src/app/services/print-table.service'
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
export class ReportIncomeComponent implements OnInit, OnDestroy {
  incomes = [
    'MONTHLYPAYMENTS',
    'CONTRIBUTIONS',
    'CERTIFICATIONS',
    'FINES',
    'EXTRA_CONTRIBUTIONS',
    'INCOMES',
  ]

  public form!: UntypedFormGroup

  private monthlyPaymentsMadeSubs!: Subscription
  private contributionsPaidSubs!: Subscription
  private certifcationsSubs!: Subscription
  private finesSubs!: Subscription
  private reportSubs!: Subscription
  private reportTile = ''

  constructor(
    private fb: UntypedFormBuilder,
    private store: Store<AppState>,
    private printTableService: PrintTableService
  ) {}

  ngOnInit(): void {
    this.createForm()
    this.monthlyPaymentsMadeSubs = this.store
      .select('monthlyPaymentMade')
      .subscribe(({ monthlyPaymentsMade, loaded }) => {
        if (loaded) {
          this.generatePdf(monthlyPaymentsMade)
        }
      })

    this.contributionsPaidSubs = this.store
      .select('contributionsPaid')
      .subscribe(({ contributionsPaid }) => {
        this.generatePdfContributions(contributionsPaid)
      })

    this.certifcationsSubs = this.store
      .select('certifications')
      .subscribe(({ certifications, loaded }) => {
        if (loaded) {
          this.generatePdfCertificationes(certifications)
        }
      })

    this.finesSubs = this.store.select('fines').subscribe(({ fines }) => {
      if (fines.length) {
        this.generatePdfFines(fines)
      }
    })

    this.reportSubs = this.store.select('report').subscribe(({ loaded, report }) => {
      if (loaded) {
        this.generatePdfReport(report)
      }
    })
  }

  ngOnDestroy(): void {
    this.store.dispatch(MonthlyPaymentMadeActions.clean())
    this.store.dispatch(ContributionsPaidActions.cleanContributionsPaid())
    this.store.dispatch(CertificationsActions.clean())
    this.store.dispatch(FinesActions.clean())
    this.store.dispatch(ReportActions.clean())

    this.monthlyPaymentsMadeSubs?.unsubscribe()
    this.contributionsPaidSubs?.unsubscribe()
    this.certifcationsSubs?.unsubscribe()
    this.finesSubs?.unsubscribe()
    this.reportSubs?.unsubscribe()
  }

  public generate() {
    if (this.form.invalid) {
      return
    }
    const { income, initDate, endDate } = this.form.value

    switch (income) {
      case this.incomes[0]:
        this.store.dispatch(
          MonthlyPaymentMadeActions.loadByDate({
            initDate: moment(initDate).startOf('day').toISOString(),
            endDate: moment(endDate).endOf('day').toISOString(),
          })
        )
        break

      case this.incomes[1]:
        this.store.dispatch(
          ContributionsPaidActions.loadContributionsPaidByDate({
            initDate: moment(initDate).startOf('day').toISOString(),
            endDate: moment(endDate).endOf('day').toISOString(),
          })
        )
        break

      case this.incomes[2]:
        this.store.dispatch(
          CertificationsActions.loadByDate({
            initDate: moment(initDate).startOf('day').toISOString(),
            endDate: moment(endDate).endOf('day').toISOString(),
          })
        )
        break

      case this.incomes[3]:
        this.store.dispatch(
          FinesActions.loadByDate({
            initDate: moment(initDate).startOf('day').toISOString(),
            endDate: moment(endDate).endOf('day').toISOString(),
          })
        )
        break
      case this.incomes[4]:
        this.store.dispatch(
          ReportActions.getExtraContributionReportByDate({
            initDate: moment(initDate).startOf('day').toISOString(),
            endDate: moment(endDate).endOf('day').toISOString(),
          })
        )
        this.reportTile = 'APORTES EXTRAS'
        break
      case this.incomes[5]:
        this.store.dispatch(
          ReportActions.getIncomesReportByDate({
            initDate: moment(initDate).startOf('day').toISOString(),
            endDate: moment(endDate).endOf('day').toISOString(),
          })
        )
        this.reportTile = 'INGRESOS EXTRAS'
        break

      default:
        break
    }
  }

  private createForm() {
    this.form = this.fb.group({
      income: [this.incomes[0], Validators.required],
      initDate: [new Date(), Validators.required],
      endDate: [new Date(), Validators.required],
    })
  }

  private generatePdf(monthlyPaymentsMade: MonthlyPaymentMade[]) {
    const pipe = new DatePipe('es-Es')
    const upper = new UpperCasePipe()

    const head = [['#', 'FECHA', 'QUIEN PAGÓ', 'CUANTO PAGÓ']]
    const data = monthlyPaymentsMade.map((e, i) => [
      i + 1,
      upper.transform(pipe.transform(e.date, 'EEEE d MMMM, y')),
      e.user.name,
      formatNumber(e.amount, 'es-ES', '1.2'),
    ])
    const count = monthlyPaymentsMade.reduce((counter, item) => counter + item.amount, 0)

    const title = `Reporte de MENSUALIDADES del ${pipe.transform(
      this.form.value.initDate,
      'd MMMM y'
    )} al ${pipe.transform(this.form.value.endDate, 'd MMMM y')}. TOTAL: ${formatNumber(
      count,
      'es-Es',
      '1.2'
    )}`

    this.printTableService.generatePdf(title, head, data, 'INGRESOS')
  }

  private generatePdfContributions(contributionsPaid: ContributionPaid[]) {
    const pipe = new DatePipe('es-Es')
    const upper = new UpperCasePipe()

    const head = [['#', 'FECHA', 'QUIEN PAGÓ', 'CUANTO PAGÓ']]
    const data = contributionsPaid.map((e, i) => [
      i + 1,
      upper.transform(pipe.transform(e.date, 'EEEE d MMMM, y')),
      e.user.name,
      formatNumber(e.amount, 'es-ES', '1.2'),
    ])
    const count = contributionsPaid.reduce((counter, item) => counter + item.amount, 0)

    const title = `Reporte de APORTES del ${pipe.transform(
      this.form.value.initDate,
      'd MMMM y'
    )} al ${pipe.transform(this.form.value.endDate, 'd MMMM y')}. TOTAL: ${formatNumber(
      count,
      'es-Es',
      '1.2'
    )}`

    this.printTableService.generatePdf(title, head, data, 'APORTES')
  }

  private generatePdfCertificationes(certifications: Certification[]) {
    const pipe = new DatePipe('es-Es')
    const upper = new UpperCasePipe()

    const head = [['#', 'FECHA', 'QUIEN PAGÓ', 'CUANTO PAGÓ']]
    const data = certifications.map((e, i) => [
      i + 1,
      upper.transform(pipe.transform(e.date, 'EEEE d MMMM, y')),
      e.user.name,
      formatNumber(e.amount, 'es-ES', '1.2'),
    ])
    const count = certifications.reduce((counter, item) => counter + item.amount, 0)

    const title = `Reporte de CERTIFICACIONES del ${pipe.transform(
      this.form.value.initDate,
      'd MMMM y'
    )} al ${pipe.transform(this.form.value.endDate, 'd MMMM y')}. TOTAL: ${formatNumber(
      count,
      'es-Es',
      '1.2'
    )}`

    this.printTableService.generatePdf(title, head, data, 'CERTIFICACIONES')
  }

  private generatePdfReport(report: Report[]) {
    const pipe = new DatePipe('es-Es')
    const upper = new UpperCasePipe()

    const head = [['#', 'FECHA', 'QUIEN PAGÓ', 'DESCRIPCION', 'CUANTO PAGÓ']]
    const data = report.map((e, i) => [
      i + 1,
      upper.transform(pipe.transform(e.date, 'EEEE d MMMM, y')),
      e.fromUser,
      e.description,
      formatNumber(e.amount, 'es-ES', '1.2'),
    ])
    const count = report.reduce((counter, item) => counter + item.amount, 0)

    const title = `Reporte de ${this.reportTile} del ${pipe.transform(
      this.form.value.initDate,
      'd MMMM y'
    )} al ${pipe.transform(this.form.value.endDate, 'd MMMM y')}. TOTAL: ${formatNumber(
      count,
      'es-Es',
      '1.2'
    )}`

    this.printTableService.generatePdf(title, head, data, this.reportTile)
  }

  private generatePdfFines(fines: Fine[]) {
    const pipe = new DatePipe('es-Es')
    const upper = new UpperCasePipe()

    const head = [['#', 'FECHA', 'QUIEN PAGÓ', 'CUANTO PAGÓ']]
    const data = fines.map((e, i) => [
      i + 1,
      upper.transform(pipe.transform(e.date, 'EEEE d MMMM, y')),
      e.user.name,
      formatNumber(e.fine_paid, 'es-ES', '1.2'),
    ])
    const count = fines.reduce((counter, item) => counter + item.fine_paid, 0)

    const title = `Reporte de MULTAS del ${pipe.transform(
      this.form.value.initDate,
      'd MMMM y'
    )} al ${pipe.transform(this.form.value.endDate, 'd MMMM y')}. TOTAL: ${formatNumber(
      count,
      'es-Es',
      '1.2'
    )}`

    this.printTableService.generatePdf(title, head, data, 'MULTAS')
  }

  private transformDate(date: Date) {
    const isoDate = date.toISOString()
    const auxDate = isoDate.split('-')
    return `${auxDate[0]}-${auxDate[1]}-${auxDate[2].slice(0, 2)}`
  }
}
