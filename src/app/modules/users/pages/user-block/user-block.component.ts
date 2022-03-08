import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { User } from 'src/app/models/user.model';
import * as UsersActions from 'src/app/state/actions/users.action';
import { AppState } from 'src/app/state/app.reducer';

@Component({
  selector: 'app-user-block',
  templateUrl: './user-block.component.html',
  styleUrls: ['./user-block.component.scss'],
})
export class UserBlockComponent implements OnInit {
  public block?: string;
  public users: User[] = [];

  constructor(private route: ActivatedRoute, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.route.params.subscribe(({ block }) => {
      this.block = block;
      this.store.dispatch(UsersActions.loadByBlock({ block }));
    });

    this.store.select('users').subscribe(({ users }) => {
      this.users = users;
    });
  }
}
