import { Component, inject } from '@angular/core'
import { Store } from '@ngrx/store'
import { AppState } from '@state/app.reducer'
import { incomesFeature } from '@state/reducers/incomes.reducer'

@Component({
  selector: 'app-income-detail',
  templateUrl: './income-detail.component.html',
  styleUrls: ['./income-detail.component.scss'],
})
export class IncomeDetailComponent {
  income$ = inject(Store<AppState>).select(incomesFeature.selectIncome)
}
