import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Expense } from 'src/app/models/expense.model'
import { User } from 'src/app/models/user.model'

@Component({
  selector: 'app-expenses-form',
  templateUrl: './expenses-form.component.html',
  styleUrls: ['./expenses-form.component.scss'],
})
export class ExpensesFormComponent implements OnInit {
  public form!: FormGroup
  @Input() expense!: Expense
  @Input() auth!: User | null
  @Output() clickSave = new EventEmitter<any>()

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.createForm()
  }

  public save() {
    if (this.form.invalid) {
      return
    }
    this.clickSave.emit(this.form.value)
  }

  private createForm() {
    this.form = this.fb.group({
      description: [
        this.expense ? this.expense.description : '',
        [Validators.required, Validators.minLength(6)],
      ],

      amount: [
        this.expense ? this.expense.amount : 5,
        [Validators.required, Validators.min(0), Validators.max(10000)],
      ],

      date: [this.expense ? this.expense.date : new Date().toISOString(), [Validators.required]],

      from_user: [
        this.expense ? this.expense.from_user : this.auth!.name,
        [Validators.required, Validators.minLength(6)],
      ],

      to_user: [
        this.expense ? this.expense.to_user : '',
        [Validators.required, Validators.minLength(6)],
      ],
    })
  }
}
