import { Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { userFeature } from '@state/reducers/user.reducer'

@Component({
    selector: 'app-user-detail',
    templateUrl: './user-detail.component.html',
    styleUrls: ['./user-detail.component.scss'],
    standalone: false
})
export class UserDetailComponent {
  public user$ = this.store.select(userFeature.selectUser)

  constructor(private store: Store) {}
}
