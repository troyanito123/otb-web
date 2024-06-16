import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { MatDialog } from '@angular/material/dialog'
import { DeleteDialogComponent } from 'src/app/layouts/delete-dialog/delete-dialog.component'
import { Store } from '@ngrx/store'
import { userFeature } from '@state/reducers/user.reducer'
import { UserActions } from '@state/actions/user.action'
import { PrePaymentActions } from '@state/actions/pre-payment.action'

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss'],
})
export class UserViewComponent implements OnInit, OnDestroy {
  public user$ = this.store.select(userFeature.selectUser)

  constructor(private store: Store, private route: ActivatedRoute, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.route.params.subscribe(({ id }) => this.store.dispatch(UserActions.loadUser({ id })))
  }

  ngOnDestroy(): void {
    this.store.dispatch(UserActions.cleanUser())
    this.store.dispatch(PrePaymentActions.cleanPayment())
  }

  remove(id: number) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: { name: 'usuario' },
    })
    dialogRef.afterClosed().subscribe((result) => {
      if (result)
        this.store.dispatch(
          UserActions.remove({
            id,
            forward: '/private/users',
            messageSupplier: (name: string) =>
              `Se cambio el estado del vecino \"${name}\" a ELIMINADO`,
          })
        )
    })
  }
}
