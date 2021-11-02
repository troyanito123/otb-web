import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.reducer';
import * as PrePaymentActions from 'src/app/state/actions/pre-payment.action';

import { PrePayment } from 'src/app/models/pre-payment';
import { User } from 'src/app/models/user.model';

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-user-receipt',
  templateUrl: './user-receipt.component.html',
  styleUrls: ['./user-receipt.component.scss'],
})
export class UserReceiptComponent implements OnInit, OnDestroy {
  public prePayments: PrePayment[] = [];
  private prePaymentsSubs!: Subscription;

  public user!: User | null;
  public auth!: User | null;

  total = 0;

  qrValue = '';

  private userSubs!: Subscription;
  private authSubs!: Subscription;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.loadStore();
  }

  ngOnDestroy(): void {
    this.store.dispatch(PrePaymentActions.cleanPayment());
    this.prePaymentsSubs?.unsubscribe();
    this.userSubs?.unsubscribe();
    this.authSubs?.unsubscribe();
  }

  print() {
    const element = document.getElementById('receipt');
    html2canvas(element!).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const doc = new jsPDF();
      doc.addImage(imgData, 'letter', 5, 15, 200, 120);
      doc.addImage(imgData, 'letter', 5, 160, 200, 120);
      doc.save(`${this.user?.name} - ${this.description}.pdf`);
    });
  }

  private loadStore() {
    this.userSubs = this.store
      .select('user')
      .subscribe(({ user }) => (this.user = user));
    this.authSubs = this.store
      .select('auth')
      .subscribe(({ user }) => (this.auth = user));
    this.prePaymentsSubs = this.store
      .select('prePayment')
      .subscribe(({ prePayments }) => {
        this.prePayments = prePayments;
      });
    this.total = this.prePayments.reduce(
      (counter, item) => counter + item.amountForPay,
      0
    );

    this.qrValue = JSON.stringify({
      description: this.description,
      vecino: this.user!.name,
      directivo: this.auth!.name,
      total_pagado: this.total,
    });
  }

  get description() {
    const months = this.prePayments.map((p) => p.month).join('-');
    return `Pago aporte mensual de lo meses: ${months}`;
  }
}
