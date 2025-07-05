import { Component, OnDestroy } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Store } from '@ngrx/store'
import { Expense } from 'src/app/models/expense.model'
import { DatePipe, formatNumber, UpperCasePipe } from '@angular/common'
import { ExpensesActions } from 'src/app/state/actions/expenses.action'
import moment from 'moment'

@Component({
    selector: 'app-report-expenses',
    templateUrl: './report-expenses.component.html',
    styleUrls: ['./report-expenses.component.scss'],
    standalone: false
})
export class ReportExpensesComponent implements OnDestroy {
  readonly form: FormGroup

  constructor(private fb: FormBuilder, private store: Store) {
    this.form = this.createForm()
  }

  ngOnDestroy(): void {
    this.store.dispatch(ExpensesActions.clean())
  }

  public generateReport() {
    if (this.form.invalid) {
      this.form.markAllAsTouched()
      return
    }
    const { initDate, endDate } = this.form.value

    this.store.dispatch(
      ExpensesActions.loadByDates({
        initDate: moment(initDate).startOf('day').toISOString(),
        endDate: moment(endDate).endOf('day').toISOString(),
        handlerCallback: this.generatePdf,
      })
    )
  }

  private createForm() {
    return this.fb.group({
      initDate: [new Date(), Validators.required],
      endDate: [new Date(), Validators.required],
    })
  }

  private generatePdf(expenses: Expense[], initDate: string, endDate: string) {
    const pipe = new DatePipe('es-Es')
    const upper = new UpperCasePipe()

    const head = [['#', 'FECHA', 'QUIEN USÓ', 'PARA QUE USÓ', 'CUANTO USÓ']]
    const body = expenses.map((e, i) => [
      i + 1,
      upper.transform(pipe.transform(e.date, 'EEEE, d MMMM, y')),
      e.to_user,
      e.description,
      formatNumber(e.amount, 'es-ES', '1.2'),
    ])

    const count = expenses.reduce((counter, item) => counter + item.amount, 0)

    const title = `Reporte de gastos del ${pipe.transform(
      initDate,
      'd MMMM y'
    )} al ${pipe.transform(endDate, 'd MMMM y')}. TOTAL: ${formatNumber(count, 'es-Es', '1.2')}`

    return { title, head, body, type: 'GASTOS' }
  }
}
