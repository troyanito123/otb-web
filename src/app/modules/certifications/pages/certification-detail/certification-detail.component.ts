import { Component, inject } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'

import { Store } from '@ngrx/store'
import { CertificationActions } from 'src/app/state/actions/certification.action'

import { DeleteDialogComponent } from 'src/app/layouts/delete-dialog/delete-dialog.component'
import { certificationFeature } from '@state/reducers/certification.reducer'

@Component({
  selector: 'app-certification-detail',
  templateUrl: './certification-detail.component.html',
  styleUrls: ['./certification-detail.component.scss'],
})
export class CertificationDetailComponent {
  #store = inject(Store)
  #matDialog = inject(MatDialog)

  readonly certification$ = this.#store.select(certificationFeature.selectCertification)

  remove(id: number) {
    const dialog = this.#matDialog.open(DeleteDialogComponent, {
      data: { name: 'certificacion' },
    })
    dialog.afterClosed().subscribe((result) => {
      if (result) {
        this.#store.dispatch(
          CertificationActions.remove({
            id,
            forwardSupplier: () => '/private/certifications',
            messageSupplier: (certification) =>
              `Se elimino la certificación de: ${certification.user.name}`,
          })
        )
      }
    })
  }
}
