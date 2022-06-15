import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.reducer';
import * as ExpenseActions from 'src/app/state/actions/expense.action';

import { Expense } from 'src/app/models/expense.model';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from 'src/app/layouts/delete-dialog/delete-dialog.component';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-expenses-view',
  templateUrl: './expenses-view.component.html',
  styleUrls: ['./expenses-view.component.scss'],
})
export class ExpensesViewComponent implements OnInit, OnDestroy {
  public expense!: Expense | null;
  private expenseSubs!: Subscription;

  public auth!: User | null;
  public authSubs?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private router: Router,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(({ id }) => {
      this.store.dispatch(ExpenseActions.load({ id }));
    });

    this.subscribeStore();
  }

  ngOnDestroy(): void {
    this.store.dispatch(ExpenseActions.clean());
    this.unsubscribeStore();
  }

  public remove() {
    const dialogRef = this.matDialog.open(DeleteDialogComponent, {
      data: { name: 'gasto' },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(ExpenseActions.remove({ id: this.expense!.id }));
      }
    });
  }

  private subscribeStore() {
    this.expenseSubs = this.store
      .select('expense')
      .subscribe(({ expense, loading, removed }) => {
        this.expense = expense;
        if (removed) {
          this.router.navigate(['expenses']);
        }
      });

    this.authSubs = this.store.select('auth').subscribe(({ user }) => {
      this.auth = user;
    });
  }

  private unsubscribeStore() {
    this.expenseSubs?.unsubscribe();
    this.authSubs?.unsubscribe();
  }
}
