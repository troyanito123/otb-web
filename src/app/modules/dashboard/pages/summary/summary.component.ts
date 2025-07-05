import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core'
import { Store } from '@ngrx/store'
import { incomeExpensesFeature } from '@state/reducers/income-expenses.reducer'
import { IncomeExpensesActions } from 'src/app/state/actions/income-expenses.actions'
import Chart from 'chart.js/auto'
import { map, take } from 'rxjs/operators'

@Component({
    selector: 'app-summary',
    templateUrl: './summary.component.html',
    styleUrls: ['./summary.component.scss'],
    standalone: false
})
export class SummaryComponent implements OnInit, OnDestroy, AfterViewInit {
  #store = inject(Store)
  readonly total$ = this.#store.select(incomeExpensesFeature.selectTotal)
  readonly expenses$ = this.#store.select(incomeExpensesFeature.selectExpenses)
  @ViewChild('incomes') incomesChart?: ElementRef

  ngOnInit(): void {
    this.#store.dispatch(IncomeExpensesActions.loadIncomesExpenses())
  }

  async ngAfterViewInit() {
    if (!this.incomesChart?.nativeElement) return

    const { labels, data } = await this.#store
      .select(incomeExpensesFeature.incomesList)
      .pipe(map((data) => ({ labels: data.map((d) => d.name), data: data.map((d) => d.value) })))
      .pipe(take(2))
      .toPromise()

    const textCenter = {
      id: 'textCenter',
      beforeDatasetsDraw(chart: Chart): boolean | void {
        const { ctx } = chart
        ctx.save()
        ctx.textAlign = 'center'
        ctx.font = 'bold 34px Roboto'
        ctx.fillText(
          `${data.reduce((a, c) => a + c, 0)} Bs.`,
          chart.getDatasetMeta(0).data[0].x,
          chart.getDatasetMeta(0).data[0].y - 8
        )
        ctx.font = '16px  Roboto'
        ctx.fillText(
          'Total ingresos',
          chart.getDatasetMeta(0).data[0].x,
          chart.getDatasetMeta(0).data[0].y + 24,
          150
        )
      },
    }
    new Chart(this.incomesChart.nativeElement, {
      type: 'doughnut',
      data: {
        labels,
        datasets: [
          {
            label: 'Monto',
            data: data,
          },
        ],
      },
      plugins: [textCenter],
    })
  }
  ngOnDestroy() {
    this.#store.dispatch(IncomeExpensesActions.clean())
  }
}
