import { Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { ExpenseActions } from 'src/app/state/actions/expense.action'
import { MatDialog } from '@angular/material/dialog'
import { DeleteDialogComponent } from 'src/app/layouts/delete-dialog/delete-dialog.component'
import { expenseFeature } from '@state/reducers/expense.reducer'
import { authFeature } from '@state/reducers/auth.reducer'

@Component({
  selector: 'app-expenses-detail',
  templateUrl: './expenses-detail.component.html',
  styleUrls: ['./expenses-detail.component.scss'],
})
export class ExpensesDetailComponent {
  readonly expense$ = this.store.select(expenseFeature.selectExpense)
  readonly auth$ = this.store.select(authFeature.selectUser)

  constructor(private store: Store, private matDialog: MatDialog) {}

  public remove(expenseId: number) {
    const dialogRef = this.matDialog.open(DeleteDialogComponent, {
      data: { name: 'gasto' },
    })
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(
          ExpenseActions.remove({
            id: expenseId,
            forwardSupplier: (id) => '/private/expenses',
            messageSupplier: (expense) =>
              `Se eliminó correctamente el gasto: ${expense?.description}`,
          })
        )
      }
    })
  }
}
