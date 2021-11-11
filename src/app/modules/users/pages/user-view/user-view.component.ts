import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { DeleteDialogComponent } from 'src/app/layouts/delete-dialog/delete-dialog.component';
import { User } from 'src/app/models/user.model';
import { cleanUser, loadUser, remove } from 'src/app/state/actions/user.action';
import { AppState } from 'src/app/state/app.reducer';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss'],
})
export class UserViewComponent implements OnInit, OnDestroy {
  public user!: User | null;

  private userSubs!: Subscription;

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(({ id }) =>
      this.store.dispatch(loadUser({ id }))
    );

    this.store.select('user').subscribe(({ user, removed }) => {
      this.user = user;
      if (removed) this.router.navigate(['/users']);
    });
  }

  ngOnDestroy(): void {
    this.store.dispatch(cleanUser());
    this.userSubs?.unsubscribe();
  }

  remove() {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: { name: 'usuario' },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(remove({ id: this.user!.id }));
      }
    });
  }
}
