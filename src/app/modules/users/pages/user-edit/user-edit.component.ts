import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { roleFeature } from '@state/reducers/roles.reducer'
import { userFeature } from '@state/reducers/user.reducer'
import { RoleActions } from 'src/app/state/actions/role.action'
import { UserActions } from 'src/app/state/actions/user.action'

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
})
export class UserEditComponent implements OnInit {
  public user$ = this.store.select(userFeature.selectUser)
  public roles$ = this.store.select(roleFeature.selectRoles)

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(RoleActions.loadRoles())
  }

  update(data: any) {
    this.store.dispatch(
      UserActions.update({
        ...data,
        forwadSupplier: (id: number) => `/private/users/${id}/detail`,
        messageSupplier: (name: string) => `Se guardaron los datos del vecino: \"${name}\".`,
      })
    )
  }
}
