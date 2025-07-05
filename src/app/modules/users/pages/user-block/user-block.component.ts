import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Store } from '@ngrx/store'
import { usersFeature } from '@state/reducers/users.reducer'
import { UsersActions } from 'src/app/state/actions/users.action'

@Component({
    selector: 'app-user-block',
    templateUrl: './user-block.component.html',
    styleUrls: ['./user-block.component.scss'],
    standalone: false
})
export class UserBlockComponent implements OnInit {
  public block?: string
  public users$ = this.store.select(usersFeature.selectUsers)

  constructor(private route: ActivatedRoute, private store: Store) {}

  ngOnInit(): void {
    this.route.params.subscribe(({ block }) => {
      this.block = block
      this.store.dispatch(UsersActions.loadByBlock({ block }))
    })
  }
}
