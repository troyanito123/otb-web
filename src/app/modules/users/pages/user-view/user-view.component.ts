import { Component, OnDestroy, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { ActivatedRoute } from '@angular/router'
import { Store } from '@ngrx/store'
import { selectedUser } from '@state/selectors/user.selector'
import { Observable } from 'rxjs'
import { DeleteDialogComponent } from 'src/app/layouts/delete-dialog/delete-dialog.component'
import { User } from 'src/app/models/user.model'
import { cleanUser, loadUser, remove } from 'src/app/state/actions/user.action'
import { AppState } from 'src/app/state/app.reducer'

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss'],
})
export class UserViewComponent implements OnInit, OnDestroy {
  public user$: Observable<User | null>

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {
    this.user$ = this.store.select(selectedUser)
  }

  ngOnInit(): void {
    this.route.params.subscribe(({ id }) => this.store.dispatch(loadUser({ id })))
  }

  ngOnDestroy(): void {
    this.store.dispatch(cleanUser())
  }

  remove(id: number) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: { name: 'usuario' },
    })
    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.store.dispatch(remove({ id }))
    })
  }
}
