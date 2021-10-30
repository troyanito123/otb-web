import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.reducer';
import * as UsersActions from 'src/app/state/actions/users.action';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit, OnDestroy {
  form!: FormGroup;

  private usersSubs!: Subscription;

  constructor(private fb: FormBuilder, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.createForm();
    this.usersSubs = this.store
      .select('users')
      .subscribe(({ saveFinish, error }) => {
        if (saveFinish) this.handledSaveFinish();
        if (error) this.handledError(error);
      });
  }

  ngOnDestroy(): void {
    this.usersSubs?.unsubscribe();
  }

  public save() {
    if (this.form.invalid) return;

    const {
      name,
      email,
      password,
      identification_number,
      block_number,
      address_number,
    } = this.form.value;

    this.store.dispatch(
      UsersActions.create({
        name,
        email,
        password,
        identification_number,
        block_number,
        address_number,
      })
    );
  }

  private handledSaveFinish() {
    this.form.reset();
  }
  private handledError(error: any) {
    alert('ERROR AL CREAR EL USUARIO');
  }

  private createForm() {
    this.form = this.fb.group({
      name: ['test 09', [Validators.required, Validators.minLength(3)]],
      email: ['test09@test.com', [Validators.required, Validators.email]],
      password: ['test09', [Validators.required, Validators.minLength(6)]],
      identification_number: [
        '3452312cb',
        [Validators.required, Validators.minLength(6)],
      ],
      block_number: ['37f', [Validators.required]],
      address_number: ['23', [Validators.required]],
    });
  }
}
