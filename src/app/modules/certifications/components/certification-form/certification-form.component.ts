import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { Certification } from '@models/certification.model'

@Component({
    selector: 'app-certification-form',
    templateUrl: './certification-form.component.html',
    styleUrls: ['./certification-form.component.scss'],
    standalone: false
})
export class CertificationFormComponent implements OnInit {
  @Input() certification?: Certification | null
  #formBuilder = inject(FormBuilder)
  readonly certificationsTypes = ['SIMPLE', 'COMPLETE']

  readonly form = this.#formBuilder.group({
    description: [this.certification?.description, [Validators.required]],
    amount: [
      this.certification?.amount,
      [Validators.required, Validators.min(0), Validators.max(10000)],
    ],
    type: [this.certification?.type, [Validators.required]],
    date: [this.certification?.date, [Validators.required]],
  })

  @Output() clickSave = new EventEmitter<any>()

  ngOnInit(): void {
    this.form.reset({ ...this.certification })
  }

  public saveAction() {
    if (this.form.invalid) {
      this.form.markAllAsTouched()
      return
    }

    this.clickSave.emit({ ...this.form.value })
  }
}
