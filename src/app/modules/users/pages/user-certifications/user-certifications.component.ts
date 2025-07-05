import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

import { Store } from '@ngrx/store'
import { CertificationActions } from 'src/app/state/actions/certification.action'
import { CertificationType } from 'src/app/models/certification.model'
import { Transaction } from 'src/app/models/transaction.model'

@Component({
    selector: 'app-user-certifications',
    templateUrl: './user-certifications.component.html',
    styleUrls: ['./user-certifications.component.scss'],
    standalone: false
})
export class UserCertificationsComponent {
  public form: FormGroup

  readonly certificationsTypes = Object.values(CertificationType)

  constructor(private fb: FormBuilder, private store: Store) {
    this.form = this.createForm()
  }

  public save() {
    if (this.form.invalid) {
      return
    }

    const { description, amount, type: ctype, date } = this.form.value

    this.store.dispatch(
      CertificationActions.create({
        description,
        amount,
        ctype,
        date,
        forwardSupplier: (id) => `/private/users/${id}/receipt-view`,
        transactionsCallback: (certification) =>
          new Transaction(certification.description, certification.amount, certification.date),
      })
    )
  }

  private createForm() {
    return this.fb.group({
      description: ['', [Validators.required, Validators.minLength(6)]],
      amount: [20, [Validators.required, Validators.min(1)]],
      type: [this.certificationsTypes[0], [Validators.required]],
      date: [new Date().toISOString(), [Validators.required]],
    })
  }
}
