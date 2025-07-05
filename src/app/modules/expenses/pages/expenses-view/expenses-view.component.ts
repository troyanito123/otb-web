import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Store } from '@ngrx/store'
import { ExpenseActions } from '@state/actions/expense.action'

@Component({
    selector: 'app-expenses-view',
    templateUrl: './expenses-view.component.html',
    styleUrls: ['./expenses-view.component.scss'],
    standalone: false
})
export class ExpensesViewComponent implements OnInit, OnDestroy {
  constructor(private route: ActivatedRoute, private store: Store) {}

  ngOnInit(): void {
    this.route.params.subscribe(({ id }) => {
      this.store.dispatch(ExpenseActions.load({ id }))
    })
  }

  ngOnDestroy(): void {
    this.store.dispatch(ExpenseActions.clean())
  }
}
