import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MonthlyPayment } from 'src/app/models/monthly-payment.model'

@Component({
  selector: 'app-monthly-payments-form',
  templateUrl: './monthly-payments-form.component.html',
  styleUrls: ['./monthly-payments-form.component.scss'],
})
export class MonthlyPaymentsFormComponent implements OnInit {
  public form!: FormGroup

  @Input() monthlyPayment!: MonthlyPayment | null

  @Output() clickSave = new EventEmitter<any>()

  readonly years = ['2021', '2022', '2023', '2024', '2025']

  readonly months = [
    'ENERO',
    'FEBRERO',
    'MARZO',
    'ABRIL',
    'MAYO',
    'JUNIO',
    'JULIO',
    'AGOSTO',
    'SEPTIEMBRE',
    'OCTUBRE',
    'NOVIEMBRE',
    'DICIEMBRE',
  ]

  constructor(private formBuilder: FormBuilder) {}

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
    this.form = this.formBuilder.group({
      year: [
        this.monthlyPayment ? this.monthlyPayment!.year : this.years[0],
        [Validators.required],
      ],
      month: [
        this.monthlyPayment ? this.monthlyPayment!.month : this.months[0],
        [Validators.required],
      ],
      amount: [this.monthlyPayment ? this.monthlyPayment!.amount : 5, [Validators.required]],
    })
  }
}
