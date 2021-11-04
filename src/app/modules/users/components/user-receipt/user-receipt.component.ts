import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.reducer';
import * as PrePaymentActions from 'src/app/state/actions/pre-payment.action';
import * as PreContributionActions from 'src/app/state/actions/pre-constribution.action';

import { PrePayment } from 'src/app/models/pre-payment';
import { User } from 'src/app/models/user.model';

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { PreContribution } from 'src/app/models/pre-contributions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-receipt',
  templateUrl: './user-receipt.component.html',
  styleUrls: ['./user-receipt.component.scss'],
})
export class UserReceiptComponent implements OnInit, OnDestroy {
  @Input() prePayments!: PrePayment[];

  @Input() preContribution!: PreContribution | null;

  @Input() user!: User;

  @Input() auth!: User;

  get description() {
    const monthsYear = this.prePayments
      .map((p) => `${p.month} - ${p.year}`)
      .join(', ');
    const monthlyPayments = monthsYear.length
      ? `PAGOS MENSUALIDADES DE LOS MESES: ${monthsYear}. `
      : '';
    console.log(monthlyPayments);
    const desc = this.preContribution?.description;

    return monthlyPayments + desc;
  }

  get total() {
    const subTotalMP = this.prePayments
      .map((p) => p.amountForPay)
      .reduce((counter, item) => counter + item, 0);

    const subTotalC = this.preContribution!.amountToPay;
    return subTotalC + subTotalMP;
  }

  get qrValue() {
    return JSON.stringify({
      description: this.description,
      nombre: this.user.name,
      block_number: this.user.block_number,
      address_number: this.user.address_number,
      directivo: this.auth.name,
      monto: this.total,
    });
  }

  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  print() {
    const element = document.getElementById('receipt');
    html2canvas(element!).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const doc = new jsPDF();
      doc.addImage(imgData, 'letter', 5, 15, 200, 120);
      doc.addImage(imgData, 'letter', 5, 160, 200, 120);
      doc.save(`${this.user?.name} - ${this.description}.pdf`);
      // this.store.dispatch(PrePaymentActions.cleanPayment());
      // this.store.dispatch(PreContributionActions.unsetContribution());
      this.router.navigate(['users', this.user.id]);
    });
  }
}
