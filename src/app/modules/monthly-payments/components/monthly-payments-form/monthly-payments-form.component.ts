import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.reducer';
import * as MonthlyPaymentActions from 'src/app/state/actions/monthly-payment.action';

import { MonthlyPayment } from 'src/app/models/monthly-payment.model';

@Component({
  selector: 'app-monthly-payments-form',
  templateUrl: './monthly-payments-form.component.html',
  styleUrls: ['./monthly-payments-form.component.scss'],
})
export class MonthlyPaymentsFormComponent implements OnInit, OnDestroy {
  public form!: FormGroup;

  @Input() monthlyPayment!: MonthlyPayment | null;

  private monthlyPaymentSubs!: Subscription;

  years = ['2021', '2022', '2023', '2024'];

  months = [
    'ENERO',
    'FEBRERO',
    'MARZO',
    'ABRIL',
    'MAYO',
    'JUNIO',
    'JULIO',
    'AGOSTO',
    'SEPTIEMBRE',
    'OCTUBRE',
    'NOVIEMBRE',
    'DICIEMBRE',
  ];

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.subscribeStore();
  }

  ngOnDestroy(): void {
    this.unsubscribeStore();
    this.store.dispatch(MonthlyPaymentActions.softClean());
  }

  public save() {
    if (this.form.invalid) {
      return;
    }
    if (!!this.monthlyPayment) this.update();
    if (!this.monthlyPayment) this.create();
  }

  private create() {
    const { year, month, amount } = this.form.value;
    this.store.dispatch(MonthlyPaymentActions.create({ year, month, amount }));
  }

  private update() {
    const { year, month, amount } = this.form.value;
    this.store.dispatch(
      MonthlyPaymentActions.update({
        id: this.monthlyPayment!.id,
        year,
        month,
        amount,
      })
    );
  }

  private subscribeStore() {
    this.monthlyPaymentSubs = this.store
      .select('monthlyPayment')
      .subscribe(({ created, updated, monthlyPayment }) => {
        if (created) this.handledCreated(monthlyPayment!);
        if (updated) this.handledUpdated(monthlyPayment!);
      });
  }

  private unsubscribeStore() {
    this.monthlyPaymentSubs?.unsubscribe();
  }

  private handledCreated(monthlyPayment: MonthlyPayment) {
    this.router.navigate(['monthly-payments', monthlyPayment.id]);
  }

  private handledUpdated(monthlyPayment: MonthlyPayment) {
    this.router.navigate(['monthly-payments', monthlyPayment.id]);
  }

  private createForm() {
    this.form = this.formBuilder.group({
      year: [
        this.monthlyPayment ? this.monthlyPayment.year : this.years[0],
        [Validators.required],
      ],
      month: [
        this.monthlyPayment ? this.monthlyPayment.month : this.months[0],
        [Validators.required],
      ],
      amount: [
        this.monthlyPayment ? this.monthlyPayment.amount : 10,
        [Validators.required],
      ],
    });
  }
}
