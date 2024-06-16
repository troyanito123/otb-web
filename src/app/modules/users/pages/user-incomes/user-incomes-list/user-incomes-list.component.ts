import { Component, OnInit, inject } from '@angular/core'
import { Store } from '@ngrx/store'
import { IncomesActions } from '@state/actions/incomes.action'
import { incomesFeature } from '@state/reducers/incomes.reducer'

@Component({
  selector: 'app-user-incomes-list',
  templateUrl: './user-incomes-list.component.html',
  styleUrls: ['./user-incomes-list.component.scss'],
})
export class UserIncomesListComponent implements OnInit {
  #store = inject(Store)
  readonly displayedColumns: string[] = ['amount', 'date', 'description', 'options']
  readonly incomes$ = this.#store.select(incomesFeature.selectIncomes)

  ngOnInit(): void {
    this.#store.dispatch(IncomesActions.loadByUser())
  }
}
