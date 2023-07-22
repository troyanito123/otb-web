import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, inject } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { IncomeModel } from '@models/income.model'

@Component({
  selector: 'app-user-incomes-form',
  templateUrl: './user-incomes-form.component.html',
  styleUrls: ['./user-incomes-form.component.scss'],
})
export class UserIncomesFormComponent implements OnChanges {
  #formBuilder = inject(FormBuilder)
  form = this.createForm()
  statusList = ['ACTIVE', 'INACTIVE', 'DELETED']
  @Input() income: IncomeModel | null = null
  @Output() onSubmit = new EventEmitter()

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.income.currentValue) this.form.reset({ ...this.income })
  }

  public saveChanges() {
    if (this.form.invalid) {
      return
    }
    this.onSubmit.emit({ ...this.form.value, id: this.income?.id })
  }

  private createForm() {
    return this.#formBuilder.group({
      amount: [0, [Validators.required, Validators.min(0), Validators.max(999999)]],
      description: ['', [Validators.required]],
      collector: ['', [Validators.required]],
      date: [new Date(), [Validators.required]],
      status: ['ACTIVE', [Validators.required]],
    })
  }
}
