import { Component } from '@angular/core'

import { Store } from '@ngrx/store'
import { CertificationActions } from 'src/app/state/actions/certification.action'

import { certificationFeature } from '@state/reducers/certification.reducer'

@Component({
  selector: 'app-certification-edit',
  templateUrl: './certification-edit.component.html',
  styleUrls: ['./certification-edit.component.scss'],
})
export class CertificationEditComponent {
  readonly certification$ = this.store.select(certificationFeature.selectCertification)

  constructor(private store: Store) {}

  public update(data: any, id: number) {
    const { description, amount, type, date } = data

    this.store.dispatch(
      CertificationActions.update({
        id,
        description,
        amount,
        ctype: type,
        date,
        forwardSupplier: (id) => `private/certifications/${id}`,
        messageSupplier: (certification) =>
          `Certificación del usuario ${certification.user.name} actualizado`,
      })
    )
  }
}
