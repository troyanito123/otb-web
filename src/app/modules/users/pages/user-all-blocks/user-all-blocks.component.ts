import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { clean } from 'src/app/state/actions/users.action';
import { AppState } from 'src/app/state/app.reducer';

@Component({
  selector: 'app-user-all-blocks',
  templateUrl: './user-all-blocks.component.html',
  styleUrls: ['./user-all-blocks.component.scss'],
})
export class UserAllBlocksComponent implements OnInit, OnDestroy {
  public blocks = [
    '67G',
    '68G',
    '66-37F',
    '38E',
    '39D',
    '19C',
    '1L',
    '5B',
    '4A',
    '65H',
    '35J',
    '36I',
    '17K',
    '17',
    '18',
    '003',
  ];
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.store.dispatch(clean());
  }
}
