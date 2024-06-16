import { Component } from '@angular/core'
import { Validators, FormGroup, FormBuilder } from '@angular/forms'

import { Store } from '@ngrx/store'
import { AppState } from 'src/app/state/app.reducer'
import { AuthActions } from 'src/app/state/actions/auth.action'

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent {
  public form: FormGroup
  public showPassword = false

  constructor(private store: Store<AppState>, private fb: FormBuilder) {
    this.form = this.createForm()
  }

  public signin() {
    if (this.form.invalid) return
    this.store.dispatch(
      AuthActions.signin({
        ...this.form.value,
        forward: '/private/dashboard',
      })
    )
  }

  private createForm() {
    return this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })
  }
}
