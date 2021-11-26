import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.reducer';
import * as CertificationActions from 'src/app/state/actions/certification.action';

import { Certification } from 'src/app/models/certification.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-certification-edit',
  templateUrl: './certification-edit.component.html',
  styleUrls: ['./certification-edit.component.scss'],
})
export class CertificationEditComponent implements OnInit, OnDestroy {
  public certification!: Certification | null;
  private certificationSubs!: Subscription;

  public form!: FormGroup;
  public certificationsTypes = ['SIMPLE', 'COMPLETE'];

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.certificationSubs = this.store
      .select('certification')
      .subscribe(({ certification, error, updated }) => {
        this.certification = certification;
        this.createForm();
        if (error) this.handledError(error);
        if (updated) this.handledUpdated(certification!);
      });
  }

  ngOnDestroy(): void {
    this.store.dispatch(CertificationActions.softClean());
    this.certificationSubs?.unsubscribe();
  }

  save() {
    if (this.form.invalid) {
      return;
    }

    const { description, amount, type, date } = this.form.value;
    this.store.dispatch(
      CertificationActions.update({
        id: this.certification!.id,
        description,
        amount,
        ctype: type,
        date,
      })
    );
  }

  private handledError(error: any) {
    console.log(error);
  }

  private handledUpdated(certification: Certification) {
    this.router.navigate(['certifications', certification.id]);
  }

  private createForm() {
    this.form = this.fb.group({
      description: [this.certification?.description, [Validators.required]],
      amount: [
        this.certification?.amount,
        [Validators.required, Validators.min(0), Validators.max(10000)],
      ],
      type: [this.certification?.type, [Validators.required]],
      date: [this.certification?.date, [Validators.required]],
    });
  }
}
