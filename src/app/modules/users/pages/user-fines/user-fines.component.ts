import { Component, OnDestroy } from '@angular/core'
import { Store } from '@ngrx/store'
import { FinesActions } from 'src/app/state/actions/fines.actions'
import { PreFinesPaid } from 'src/app/models/pre-fines-paid.model'
import { PreFinesActions } from 'src/app/state/actions/pre-fine.action'
import { FormControl, Validators } from '@angular/forms'
import { Transaction } from 'src/app/models/transaction.model'
import { MatDialog } from '@angular/material/dialog'
import { AlertComponent } from 'src/app/layouts/alert/alert.component'
import { finesFeature } from '@state/reducers/fines.reducer'
import { preFineFeature } from '@state/reducers/pre-fine.reducer'

@Component({
  selector: 'app-user-fines',
  templateUrl: './user-fines.component.html',
  styleUrls: ['./user-fines.component.scss'],
})
export class UserFinesComponent implements OnDestroy {
  readonly displayedColumns = ['date', 'meeting', 'attendence', 'fine', 'finePaid', 'option']

  readonly displayedColumnsPrePaid = ['meetingx', 'finex', 'optionx']

  readonly inputDate = new FormControl(new Date().toISOString(), [Validators.required])

  readonly allMeetingsByUserFines$ = this.store.select(finesFeature.selectAllUserPreFines)
  readonly total$ = this.store.select(finesFeature.selectTotal)
  readonly preFinesPaid$ = this.store.select(preFineFeature.selectPreFines)
  readonly totalFinesPaid$ = this.store.select(preFineFeature.selectTotal)

  constructor(private store: Store, private matDialog: MatDialog) {
    this.store.dispatch(FinesActions.loadAllFinesByUser())
  }

  ngOnDestroy(): void {
    this.store.dispatch(FinesActions.clean())
    this.store.dispatch(PreFinesActions.clean())
  }

  public addToPrePaid(preFine: PreFinesPaid) {
    this.store.dispatch(PreFinesActions.addFinePaid({ preFine }))
  }

  public removeToPrePaid(preFine: PreFinesPaid) {
    this.store.dispatch(PreFinesActions.substractFinePaid({ preFine }))
  }

  public confirmPaid(preFinesPaid: PreFinesPaid[]) {
    if (!preFinesPaid.length) {
      this.matDialog.open(AlertComponent, {
        data: {
          title: 'Error al pagar multas',
          content: 'Tiene que añadir por lo menos una multa',
        },
      })
      return
    }
    const meetingIds = JSON.stringify(preFinesPaid.map((p) => p.meetingId))

    this.store.dispatch(
      FinesActions.createMany({
        date: new Date(this.inputDate.value!),
        meetingIds,
        transactions: this.generateTransactions(preFinesPaid),
        forwardSupplier: (id) => `/private/users/${id}/receipt-view`,
      })
    )
  }

  private generateTransactions(preFinesPaid: PreFinesPaid[]) {
    return preFinesPaid.map(
      (p) => new Transaction(`Multa de ${p.meetingName}`, p.fine, new Date(this.inputDate.value!))
    )
  }
}
