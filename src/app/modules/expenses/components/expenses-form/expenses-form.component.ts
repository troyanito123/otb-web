import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.reducer';
import * as ExpenseActions from 'src/app/state/actions/expense.action';

import { Expense } from 'src/app/models/expense.model';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-expenses-form',
  templateUrl: './expenses-form.component.html',
  styleUrls: ['./expenses-form.component.scss'],
})
export class ExpensesFormComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  @Input() expense!: Expense;

  private auth!: User | null;
  private authSubs!: Subscription;
  private expenseSubs!: Subscription;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscribeStore();
  }

  ngOnDestroy() {
    this.unsubscribeStore();
  }

  public save() {
    if (this.form.invalid) {
      return;
    }

    if (!!this.expense) {
      this.update();
    } else {
      this.create();
    }
  }

  private create() {
    const { description, amount, date, from_user, to_user } = this.form.value;
    this.store.dispatch(
      ExpenseActions.create({ description, amount, date, from_user, to_user })
    );
  }

  private update() {
    const { description, amount, date, from_user, to_user } = this.form.value;
    this.store.dispatch(
      ExpenseActions.update({
        id: this.expense.id,
        description,
        amount,
        date,
        from_user,
        to_user,
      })
    );
  }

  private createForm() {
    this.form = this.fb.group({
      description: [
        this.expense ? this.expense.description : '',
        [Validators.required, Validators.minLength(6)],
      ],

      amount: [
        this.expense ? this.expense.amount : 5,
        [Validators.required, Validators.min(0)],
      ],

      date: [
        this.expense ? this.expense.date : new Date().toISOString(),
        [Validators.required],
      ],

      from_user: [
        this.expense ? this.expense.from_user : this.auth!.name,
        [Validators.required, Validators.minLength(6)],
      ],

      to_user: [
        this.expense ? this.expense.to_user : '',
        [Validators.required, Validators.minLength(6)],
      ],
    });
  }

  private subscribeStore() {
    this.authSubs = this.store.select('auth').subscribe(({ user }) => {
      this.auth = user;
      this.createForm();
    });

    this.expenseSubs = this.store
      .select('expense')
      .subscribe(({ error, created, updated, expense }) => {
        if (created) {
          this.router.navigate(['private/expenses', expense!.id]);
        }
        if (updated) {
          this.router.navigate(['private/expenses', expense!.id]);
        }

        if (error) {
          console.warn('mostrar error');
        }
      });
  }

  private unsubscribeStore() {
    this.authSubs?.unsubscribe();
    this.expenseSubs?.unsubscribe();
  }
}
