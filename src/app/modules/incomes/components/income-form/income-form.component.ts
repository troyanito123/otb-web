import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IncomeModel } from 'src/app/models/income.model';
import { IncomeService } from 'src/app/services/income.service';

@Component({
  selector: 'app-income-form',
  templateUrl: './income-form.component.html',
  styleUrls: ['./income-form.component.scss'],
})
export class IncomeFormComponent implements OnInit {
  public form: FormGroup;

  public statusList = ['ACTIVE', 'INACTIVE', 'DELETED'];

  @Input() income!: IncomeModel;

  constructor(private fb: FormBuilder, private incomeService: IncomeService) {
    this.form = this.createForm();
  }

  ngOnInit(): void {}

  public onSubmit() {
    console.log(this.form.value);
  }

  private createForm() {
    return this.fb.group({
      amount: [
        0,
        [Validators.required, Validators.min(0), Validators.max(999999)],
      ],
      description: ['', [Validators.required]],
      date: [new Date(), [Validators.required]],
      status: [this.statusList[0], [Validators.required]],
    });
  }
}
