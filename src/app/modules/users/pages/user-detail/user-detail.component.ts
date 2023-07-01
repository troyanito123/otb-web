import { Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { selectedUser } from '@state/selectors/user.selector'
import { Observable } from 'rxjs'
import { User } from 'src/app/models/user.model'
import { AppState } from 'src/app/state/app.reducer'

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent {
  public user$: Observable<User | null>

  constructor(private store: Store<AppState>) {
    this.user$ = this.store.select(selectedUser)
  }
}
