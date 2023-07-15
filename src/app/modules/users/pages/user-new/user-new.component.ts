import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { UserActions } from '@state/actions/user.action'
import { roleFeature } from '@state/reducers/roles.reducer'

import { RoleActions } from 'src/app/state/actions/role.action'
import { AppState } from 'src/app/state/app.reducer'

@Component({
  selector: 'app-user-new',
  templateUrl: './user-new.component.html',
  styleUrls: ['./user-new.component.scss'],
})
export class UserNewComponent implements OnInit {
  public roles$ = this.store.select(roleFeature.selectRoles)

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(RoleActions.loadRoles())
  }

  create(data: any) {
    this.store.dispatch(
      UserActions.create({
        ...data,
        forwadSupplier: (id: number) => `/private/users/${id}/detail`,
        messageSupplier: (name: string) => `Se guardaron los datos del vecino: \"${name}\".`
      })
    )
  }
}
