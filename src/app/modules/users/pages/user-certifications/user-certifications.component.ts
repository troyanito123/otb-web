import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.reducer';
import * as CertificationActions from 'src/app/state/actions/certification.action';
import * as TransactionsActions from 'src/app/state/actions/transactions.action';

import { User } from 'src/app/models/user.model';
import {
  Certification,
  CertificationType,
} from 'src/app/models/certification.model';
import { Transaction } from 'src/app/models/transaction.model';

@Component({
  selector: 'app-user-certifications',
  templateUrl: './user-certifications.component.html',
  styleUrls: ['./user-certifications.component.scss'],
})
export class UserCertificationsComponent implements OnInit, OnDestroy {
  form!: UntypedFormGroup;

  public user!: User | null;
  private userSubs!: Subscription;

  private certification!: Certification | null;
  private certificationSubs!: Subscription;

  certificationsTypes = Object.values(CertificationType);

  constructor(
    private fb: UntypedFormBuilder,
    private store: Store<AppState>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.subscribeStore();
  }

  ngOnDestroy() {
    this.unsubscribeStore();
  }

  public save() {
    if (this.form.invalid) {
      return;
    }

    const { description, amount, type: ctype, date } = this.form.value;

    this.store.dispatch(
      CertificationActions.create({
        description,
        amount,
        ctype,
        date,
        userId: this.user!.id,
      })
    );
  }

  private createForm() {
    this.form = this.fb.group({
      description: ['', [Validators.required, Validators.minLength(6)]],
      amount: [30, [Validators.required, Validators.min(1)]],
      type: [this.certificationsTypes[0], [Validators.required]],
      date: [new Date().toISOString(), [Validators.required]],
    });
  }

  private subscribeStore() {
    this.userSubs = this.store
      .select('user')
      .subscribe(({ user }) => (this.user = user));

    this.certificationSubs = this.store
      .select('certification')
      .subscribe(({ saved, certification }) => {
        if (saved) this.handleCreateSuccess(certification!);
      });
  }

  private unsubscribeStore() {
    this.userSubs?.unsubscribe();
    this.certificationSubs?.unsubscribe();
  }

  private resetForm() {
    this.form.reset({
      description: '',
      amount: 30,
      type: this.certificationsTypes[0],
      date: new Date().toISOString(),
    });
  }

  private generateTransaction() {
    const { date } = this.form.value;
    return new Transaction(
      this.certification!.description,
      this.certification!.amount,
      date
    );
  }

  private handleCreateSuccess(certification: Certification) {
    this.certification = certification;

    this.store.dispatch(
      TransactionsActions.addTransaction({
        transactions: [this.generateTransaction()],
      })
    );

    this.resetForm();
    this.router
      .navigate(['users', this.user!.id, 'receipt-view'])
      .then(() => this.store.dispatch(CertificationActions.clean()));
    this.router.navigate(['private/users', this.user!.id, 'receipt-view']);
  }
}
