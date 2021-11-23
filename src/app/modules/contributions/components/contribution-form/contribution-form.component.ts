import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.reducer';
import * as ContributionActions from 'src/app/state/actions/contribution.action';

import { Contribution } from 'src/app/models/contribution.model';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contribution-form',
  templateUrl: './contribution-form.component.html',
  styleUrls: ['./contribution-form.component.scss'],
})
export class ContributionFormComponent implements OnInit, OnDestroy {
  @Input() contribution!: Contribution | null;

  form!: FormGroup;

  private constributionSubs!: Subscription;

  get isEditing() {
    return !!this.contribution;
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.subscribeStore();
  }

  ngOnDestroy(): void {
    this.store.dispatch(ContributionActions.softClean());
    this.unsubscribeStore();
  }

  public save() {
    if (this.form.invalid) {
      return;
    }

    if (this.isEditing) this.update();
    if (!this.isEditing) this.create();
  }

  private create() {
    const { description, amount } = this.form.value;
    this.store.dispatch(ContributionActions.create({ description, amount }));
  }

  private update() {
    const { description, amount } = this.form.value;
    this.store.dispatch(
      ContributionActions.update({
        id: this.contribution!.id,
        description,
        amount,
      })
    );
  }

  private subscribeStore() {
    this.constributionSubs = this.store
      .select('contribution')
      .subscribe(({ contribution, created, updated }) => {
        if (created) this.handledCreated(contribution!);
        if (updated) this.handledUpdated(contribution!);
      });
  }

  private unsubscribeStore() {
    this.constributionSubs?.unsubscribe();
  }

  private handledCreated(contribution: Contribution) {
    this.router.navigate(['contributions', contribution.id]);
  }

  private handledUpdated(contribution: Contribution) {
    this.router.navigate(['contributions', contribution.id]);
  }

  private createForm() {
    this.form = this.fb.group({
      description: [
        this.isEditing ? this.contribution!.description : '',
        [Validators.required, Validators.minLength(6)],
      ],

      amount: [
        this.isEditing ? this.contribution!.amount : 10,
        [Validators.required, Validators.min(5), Validators.max(1000)],
      ],
    });
  }
}
