import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { CertificationType } from 'src/app/models/certification.model';
import { User } from 'src/app/models/user.model';
import { AppState } from 'src/app/state/app.reducer';

@Component({
  selector: 'app-user-certifications',
  templateUrl: './user-certifications.component.html',
  styleUrls: ['./user-certifications.component.scss'],
})
export class UserCertificationsComponent implements OnInit, OnDestroy {
  form!: FormGroup;

  public user!: User | null;
  private userSubs!: Subscription;

  certificationsTypes = Object.values(CertificationType);

  constructor(private fb: FormBuilder, private store: Store<AppState>) {}

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

    console.log(this.form.value, this.user!.id);
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
  }

  private unsubscribeStore() {
    this.userSubs?.unsubscribe();
  }
}
