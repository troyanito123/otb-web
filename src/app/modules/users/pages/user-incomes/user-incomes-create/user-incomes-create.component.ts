import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { User } from '@models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from '@state/app.reducer';
import { IncomesActions } from '@state/actions/incomes.action';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { userFeature } from '@state/reducers/user.reducer';

@Component({
  selector: 'app-user-incomes-create',
  templateUrl: './user-incomes-create.component.html',
  styleUrls: ['./user-incomes-create.component.scss'],
})
export class UserIncomesCreateComponent implements OnInit, OnDestroy {
  public form: UntypedFormGroup;
  private user!: User | null;
  private incomeSubs?: Subscription;
  private userSubs?: Subscription;

  public isEditing = false;
  public statusList = ['ACTIVE', 'INACTIVE', 'DELETED'];
  private incomeId?: number;

  constructor(
    private fb: UntypedFormBuilder,
    private store: Store<AppState>,
    private router: Router
  ) {
    this.form = this.createForm();
  }

  ngOnInit(): void {
    this.userSubs = this.store.select(userFeature.selectUser).subscribe((user) => {
      this.user = user;
    });
    this.incomeSubs = this.store
      .select('incomes')
      .subscribe(({ income }) => {
        // if (saved)
        //   this.router.navigate(['private/users/', this.user!.id, 'incomes']);
        if (income) {
          this.form.reset({ ...income });
          this.isEditing = true;
          this.incomeId = income.id;
        }
      });
  }

  ngOnDestroy(): void {
    this.userSubs?.unsubscribe();
    this.incomeSubs?.unsubscribe();
    this.isEditing = false;
    this.store.dispatch(IncomesActions.clean());
  }

  public onSubmit() {
    if (this.form.invalid) {
      return;
    }

    if (this.isEditing) {
      this.store.dispatch(
        IncomesActions.update({ id: this.incomeId, ...this.form.value })
      );
    } else {
      this.store.dispatch(
        IncomesActions.create({ userId: this.user?.id, ...this.form.value })
      );
    }
  }

  private updated() {}

  private createForm() {
    return this.fb.group({
      amount: [
        0,
        [Validators.required, Validators.min(0), Validators.max(999999)],
      ],
      description: ['', [Validators.required]],
      collector: ['', [Validators.required]],
      date: [new Date(), [Validators.required]],
      status: [this.statusList[0], [Validators.required]],
    });
  }
}
