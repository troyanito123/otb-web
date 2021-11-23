import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.reducer';
import * as MonthlyPaymentActions from 'src/app/state/actions/monthly-payment.action';

import { MatDialog } from '@angular/material/dialog';

import { MonthlyPayment } from 'src/app/models/monthly-payment.model';
import { DeleteDialogComponent } from 'src/app/layouts/delete-dialog/delete-dialog.component';
import { AlertComponent } from 'src/app/layouts/alert/alert.component';

@Component({
  selector: 'app-monthly-payments-detail',
  templateUrl: './monthly-payments-detail.component.html',
  styleUrls: ['./monthly-payments-detail.component.scss'],
})
export class MonthlyPaymentsDetailComponent implements OnInit, OnDestroy {
  public monthlyPayment!: MonthlyPayment | null;
  private monthlyPaymentSubs!: Subscription;

  constructor(
    private store: Store<AppState>,
    private matDialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.monthlyPaymentSubs = this.store
      .select('monthlyPayment')
      .subscribe(({ monthlyPayment, removed }) => {
        this.monthlyPayment = monthlyPayment;
        if (removed)
          this.router.navigate(['monthly-payments']).then(() =>
            this.matDialog.open(AlertComponent, {
              data: {
                title: 'Mensualidad eliminada',
                content: 'Se elimino correctamente una mensualidad',
              },
            })
          );
      });
  }

  ngOnDestroy(): void {
    this.monthlyPaymentSubs?.unsubscribe();
  }

  remove() {
    const dialog = this.matDialog.open(DeleteDialogComponent, {
      data: { name: 'mensualidad' },
    });

    dialog.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(
          MonthlyPaymentActions.remove({ id: this.monthlyPayment!.id })
        );
      }
    });
  }
}
