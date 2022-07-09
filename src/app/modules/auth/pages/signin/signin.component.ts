import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.reducer';
import * as authActions from 'src/app/state/actions/auth.action';

import { User } from 'src/app/models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from 'src/app/layouts/alert/alert.component';

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
    private router: Router,
    private dialog: MatDialog
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
    this.router.navigate(['/private/dashboard']).then(() => this.form.reset());
  }
  private handledError(error: any) {
    this.form.get('password')?.setValue('');
    this.dialog.open(AlertComponent, {
      data: {
        title: 'Error al iniciar sesión',
        content: 'Por favor revisa tus credenciales.',
      },
    });
  }
  private createForm() {
    this.form = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
}
