import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import * as CertificationActions from 'src/app/state/actions/certification.action';
import { AppState } from 'src/app/state/app.reducer';

@Component({
  selector: 'app-certification-view',
  templateUrl: './certification-view.component.html',
  styleUrls: ['./certification-view.component.scss'],
})
export class CertificationViewComponent implements OnInit, OnDestroy {
  constructor(private store: Store<AppState>, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(({ id }) =>
      this.store.dispatch(CertificationActions.load({ id }))
    );
  }

  ngOnDestroy(): void {
    this.store.dispatch(CertificationActions.clean());
  }
}
