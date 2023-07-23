import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Contribution } from 'src/app/models/contribution.model'

@Component({
  selector: 'app-contribution-form',
  templateUrl: './contribution-form.component.html',
  styleUrls: ['./contribution-form.component.scss'],
})
export class ContributionFormComponent implements OnInit {
  #formBuilder = inject(FormBuilder)
  public form: FormGroup = this.createForm()

  @Input() contribution: Contribution | null = null
  @Output() onSubmit = new EventEmitter()

  ngOnInit(): void {
    if (this.contribution) this.form.reset({ ...this.contribution })
  }

  public save() {
    if (this.form.invalid) return
    this.onSubmit.emit({ ...this.form.value, id: this.contribution?.id })
  }

  private createForm() {
    return this.#formBuilder.group({
      description: [
        this.contribution ? this.contribution.description : '',
        [Validators.required, Validators.minLength(6)],
      ],

      amount: [
        this.contribution ? this.contribution.amount : 10,
        [Validators.required, Validators.min(5), Validators.max(1000)],
      ],
    })
  }
}
