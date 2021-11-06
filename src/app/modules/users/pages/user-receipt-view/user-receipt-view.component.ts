import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.reducer';
import * as TransactionsActions from 'src/app/state/actions/transactions.action';

import { User } from 'src/app/models/user.model';
import { Transaction } from 'src/app/models/transaction.model';

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
@Component({
  selector: 'app-user-receipt-view',
  templateUrl: './user-receipt-view.component.html',
  styleUrls: ['./user-receipt-view.component.scss'],
})
export class UserReceiptViewComponent implements OnInit, OnDestroy {
  public user!: User | null;
  public auth!: User | null;
  public transactions: Transaction[] = [];

  private userSubs!: Subscription;
  private authSubs!: Subscription;
  private transactionsSubs!: Subscription;

  get qrValue() {
    return JSON.stringify({
      transactions: this.transactions,
      from_user: {
        name: this.user?.name,
        block_number: this.user?.block_number,
        address_number: this.user?.address_number,
      },
      to_user: this.auth?.name,
      date: this.transactions[0]
        ? this.transactions[0].date
        : new Date().toISOString(),
    });
  }
  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit(): void {
    this.subscribeStore();
  }

  ngOnDestroy(): void {
    this.unsubscribeStore();
  }

  public print() {
    const element = document.getElementById('receipt');
    html2canvas(element!).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const doc = new jsPDF();
      doc.addImage(imgData, 'letter', 5, 15, 200, 120);
      doc.addImage(imgData, 'letter', 5, 160, 200, 120);
      doc.save(`${this.user?.name}.pdf`);
      this.router
        .navigate(['users', this.user?.id])
        .then(() =>
          this.store.dispatch(TransactionsActions.cleanTransactions())
        );
    });
  }

  private subscribeStore() {
    this.userSubs = this.store
      .select('user')
      .subscribe(({ user }) => (this.user = user));

    this.authSubs = this.store
      .select('auth')
      .subscribe(({ user }) => (this.auth = user));

    this.transactionsSubs = this.store
      .select('transactions')
      .subscribe(({ transactions }) => (this.transactions = transactions));
  }

  private unsubscribeStore() {
    this.userSubs?.unsubscribe();
    this.authSubs?.unsubscribe();
    this.transactionsSubs?.unsubscribe();
  }
}
