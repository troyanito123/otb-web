import { Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'

import { AppState } from 'src/app/state/app.reducer'
import * as AuthActions from 'src/app/state/actions/auth.action'

import { SidenavService } from 'src/app/utils/sidenav.service'
import { User } from '@models/user.model'
import { authFeature } from '@state/reducers/auth.reducer'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public user$: Observable<User | null>

  constructor(private store: Store, private sidenavService: SidenavService) {
    this.user$ = this.store.select(authFeature.selectUser)
  }

  signout() {
    this.store.dispatch(AuthActions.signout())
  }

  sidebarToogle() {
    this.sidenavService.toggle()
  }
}
