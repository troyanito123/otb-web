import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.reducer';
import * as CertificationsActions from 'src/app/state/actions/certifications.action';

import { Certification } from 'src/app/models/certification.model';

@Component({
  selector: 'app-certification-list',
  templateUrl: './certification-list.component.html',
  styleUrls: ['./certification-list.component.scss'],
})
export class CertificationListComponent implements OnInit, OnDestroy {
  public certifications: Certification[] = [];
  private certificationsSubs!: Subscription;

  public displayedColumns = ['date', 'user', 'amount'];

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(CertificationsActions.load());
    this.certificationsSubs = this.store
      .select('certifications')
      .subscribe(({ certifications, error }) => {
        this.certifications = certifications;
        if (error) this.handledError(error);
      });
  }

  ngOnDestroy() {
    this.certificationsSubs?.unsubscribe();
  }

  private handledError(error: any) {
    console.log(error);
  }
}
