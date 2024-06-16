import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import {
  ExtraContribution,
  ExtraContributionData,
} from 'src/app/models/extra-contribution.interface'

@Component({
  selector: 'app-extra-contribution-form',
  templateUrl: './extra-contribution-form.component.html',
  styleUrls: ['./extra-contribution-form.component.scss'],
})
export class ExtraContributionFormComponent implements OnInit {
  public form!: FormGroup
  @Input() extraContribution?: ExtraContribution
  @Output() clickSave = new EventEmitter<ExtraContributionData>()

  public get isEditing() {
    return !!this.extraContribution
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.createForm()
  }

  public save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched()
      return
    }
    this.clickSave.emit(this.form.value)
  }

  private createForm() {
    this.form = this.fb.group({
      name: [this.extraContribution ? this.extraContribution.name : '', [Validators.required]],
      description: [
        this.extraContribution ? this.extraContribution.description : '',
        [Validators.required],
      ],
      amount: [
        {
          value: this.extraContribution ? this.extraContribution.amount : 10,
          disabled: this.isEditing,
        },
        [Validators.required],
      ],
      status: [
        this.extraContribution ? this.extraContribution.status : 'ACTIVE',
        [Validators.required],
      ],
    })
  }
}
