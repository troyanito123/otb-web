import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { AppState } from '@state/app.reducer';
import * as IncomeActions from '@state/actions/incomes.action';

import { IncomeModel } from '@models/income.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-income-edit',
  templateUrl: './income-edit.component.html',
  styleUrls: ['./income-edit.component.scss'],
})
export class IncomeEditComponent implements OnInit, OnDestroy {
  public form: UntypedFormGroup;

  public statusList = ['ACTIVE', 'INACTIVE', 'DELETED'];

  private income?: IncomeModel;
  private incomeSubs?: Subscription;

  constructor(
    private fb: UntypedFormBuilder,
    private store: Store<AppState>,
    private router: Router
  ) {
    this.form = this.createForm();
  }

  ngOnInit(): void {
    this.incomeSubs = this.store
      .select('incomes')
      .subscribe(({ income, saved, error }) => {
        if (income) {
          this.income = income;
          this.form.reset({ ...income, date: new Date(income.date) });
        }
        if (saved) this.router.navigate(['private/incomes', this.income!.id]);
        if (error) alert('Error');
      });
  }

  ngOnDestroy(): void {
    this.store.dispatch(IncomeActions.unsetSaved());
    this.incomeSubs?.unsubscribe();
  }

  public onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.store.dispatch(
      IncomeActions.update({
        id: this.income!.id,
        ...this.form.value,
      })
    );
  }

  private createForm() {
    return this.fb.group({
      amount: [
        0,
        [Validators.required, Validators.min(0), Validators.max(999999)],
      ],
      description: ['', [Validators.required]],
      date: [new Date(), [Validators.required]],
      status: [this.statusList[0], [Validators.required]],
    });
  }
}
