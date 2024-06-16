import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { IncomeModel } from 'src/app/models/income.model'

@Component({
  selector: 'app-income-form',
  templateUrl: './income-form.component.html',
  styleUrls: ['./income-form.component.scss'],
})
export class IncomeFormComponent implements OnInit {
  public form: FormGroup

  public statusList = ['ACTIVE', 'INACTIVE', 'DELETED']

  @Input() income!: IncomeModel
  @Output() onSubmit = new EventEmitter()

  constructor(private fb: FormBuilder) {
    this.form = this.createForm()
  }

  ngOnInit(): void {
    this.form.reset({ ...this.income })
  }

  public saveChanges() {
    this.onSubmit.emit({ ...this.form.value, id: this.income.id })
  }

  private createForm() {
    return this.fb.group({
      amount: [0, [Validators.required, Validators.min(0), Validators.max(999999)]],
      description: ['', [Validators.required]],
      date: [new Date(), [Validators.required]],
      status: [this.statusList[0], [Validators.required]],
    })
  }
}
