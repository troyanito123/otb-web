import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.reducer';
import * as CertificationActions from 'src/app/state/actions/certification.action';

import { AlertComponent } from 'src/app/layouts/alert/alert.component';
import { DeleteDialogComponent } from 'src/app/layouts/delete-dialog/delete-dialog.component';
import { Certification } from 'src/app/models/certification.model';

@Component({
  selector: 'app-certification-detail',
  templateUrl: './certification-detail.component.html',
  styleUrls: ['./certification-detail.component.scss'],
})
export class CertificationDetailComponent implements OnInit, OnDestroy {
  public certification!: Certification | null;
  private certificationSubs!: Subscription;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.certificationSubs = this.store
      .select('certification')
      .subscribe(({ certification, error, removed }) => {
        this.certification = certification;
        if (error) this.handledError(error);
        if (removed) this.handledRemove(certification!);
      });
  }

  ngOnDestroy(): void {
    this.certificationSubs?.unsubscribe();
  }

  remove() {
    const dialog = this.matDialog.open(DeleteDialogComponent, {
      data: { name: 'certificacion' },
    });
    dialog.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(
          CertificationActions.remove({ id: this.certification!.id })
        );
      }
    });
    console.log({ eliminar: this.certification });
  }

  private handledError(error: any) {
    console.log(error);
  }

  private handledRemove(certification: Certification) {
    this.router.navigate(['certifications']).then(() =>
      this.matDialog.open(AlertComponent, {
        data: {
          title: 'Eliminacion existosa',
          content: `Se elimino correctamente la certificacion de: ${certification.user.name}`,
        },
      })
    );
  }
}
