import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UsersActions } from 'src/app/state/actions/users.action';
import { AppState } from 'src/app/state/app.reducer';
import { BLOCKS } from 'src/app/utils/gobal-data';

@Component({
  selector: 'app-user-all-blocks',
  templateUrl: './user-all-blocks.component.html',
  styleUrls: ['./user-all-blocks.component.scss'],
})
export class UserAllBlocksComponent implements OnInit, OnDestroy {
  public blocks = BLOCKS;
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.store.dispatch(UsersActions.clean());
  }
}
