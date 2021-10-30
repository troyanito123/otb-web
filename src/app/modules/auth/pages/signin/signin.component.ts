import { Component, OnDestroy, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.reducer';
import * as authActions from 'src/app/state/actions/auth.action';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit, OnDestroy {
  form!: FormGroup;

  private authSubs!: Subscription;

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.authSubs = this.store.select('auth').subscribe(({ user, error }) => {
      if (user) this.handledSuccess(user);
      if (error) this.handledError(error);
    });
  }

  ngOnDestroy(): void {
    this.authSubs?.unsubscribe();
  }

  public signin() {
    if (this.form.invalid) return;
    const { email, password } = this.form.value;
    this.store.dispatch(authActions.signin({ email, password }));
  }

  private handledSuccess(user: User) {
    this.router.navigate(['/dashboard']);
  }
  private handledError(error: any) {
    alert('error');
  }
  private createForm() {
    this.form = this.fb.group({
      email: ['admin@test.com', [Validators.required]],
      password: ['jhoseph123', [Validators.required, Validators.minLength(6)]],
    });
  }
}
