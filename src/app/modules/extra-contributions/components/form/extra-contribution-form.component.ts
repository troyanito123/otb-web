import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.reducer';
import * as ExtraContActions from 'src/app/state/actions/extra-contribution.action';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ExtraContribution } from 'src/app/models/extra-contribution.interface';

@Component({
  selector: 'app-extra-contribution-form',
  templateUrl: './extra-contribution-form.component.html',
  styleUrls: ['./extra-contribution-form.component.scss'],
})
export class ExtraContributionFormComponent implements OnInit, OnDestroy {
  public form!: FormGroup;

  @Input() extraContribution?: ExtraContribution;

  private storeSubs?: Subscription;

  public get isEditing() {
    return !!this.extraContribution;
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.storeSubs = this.store
      .select('extraContributions')
      .subscribe(({ extraContribution, error, created, updated }) => {
        if (created)
          this.router.navigate(['extra-contributions', extraContribution!.id]);
        if (updated)
          this.router.navigate([
            'extra-contributions',
            this.extraContribution!.id,
          ]);

        if (error) console.warn({ error });
      });
  }

  ngOnDestroy(): void {
    this.storeSubs?.unsubscribe();
  }

  private createForm() {
    this.form = this.fb.group({
      name: [
        this.extraContribution ? this.extraContribution.name : '',
        [Validators.required],
      ],
      description: [
        this.extraContribution ? this.extraContribution.description : '',
        [Validators.required],
      ],
      amount: [
        {
          value: this.extraContribution ? this.extraContribution.amount : 10,
          disabled: this.isEditing,
        },
        [Validators.required],
      ],
      status: [
        this.extraContribution ? this.extraContribution.status : 'ACTIVE',
        [Validators.required],
      ],
    });
  }

  public save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    if (this.isEditing)
      this.store.dispatch(
        ExtraContActions.update({
          id: this.extraContribution!.id,
          data: this.form.value,
        })
      );
    else
      this.store.dispatch(ExtraContActions.create({ data: this.form.value }));
  }
}
