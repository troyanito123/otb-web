import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.reducer';
import * as ExtraContActions from 'src/app/state/actions/extra-contribution.action';

@Component({
  selector: 'app-extra-contributions-new',
  templateUrl: './extra-contributions-new.component.html',
  styleUrls: ['./extra-contributions-new.component.scss'],
})
export class ExtraContributionsNewComponent implements OnInit {
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(ExtraContActions.partialClean());
  }
}
