import { Component, OnInit } from '@angular/core'

import { Store } from '@ngrx/store'

import { AuthActions } from './state/actions/auth.action'
import { AppState } from './state/app.reducer'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false
})
export class AppComponent implements OnInit {
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(AuthActions.renew({ forward: '/private/dashboard' }))
  }
}
