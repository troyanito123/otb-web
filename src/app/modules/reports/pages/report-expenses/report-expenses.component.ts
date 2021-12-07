import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Expense } from 'src/app/models/expense.model';
import { AppState } from 'src/app/state/app.reducer';

import { DatePipe, formatNumber, UpperCasePipe } from '@angular/common';
import * as ExpensesActions from 'src/app/state/actions/expenses.action';
import { PrintTableService } from 'src/app/services/print-table.service';

@Component({
  selector: 'app-report-expenses',
  templateUrl: './report-expenses.component.html',
  styleUrls: ['./report-expenses.component.scss'],
})
export class ReportExpensesComponent implements OnInit, OnDestroy {
  public form!: FormGroup;

  private expensesSub!: Subscription;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private printTableService: PrintTableService
  ) {}

  ngOnInit(): void {
    this.createForm();

    this.expensesSub = this.store
      .select('expenses')
      .subscribe(({ expenses, loaded }) => {
        if (loaded) {
          this.generatePdf(expenses);
        }
      });
  }

  ngOnDestroy(): void {
    this.store.dispatch(ExpensesActions.clean());
    this.expensesSub?.unsubscribe();
  }

  private createForm() {
    this.form = this.fb.group({
      initDate: [new Date(), Validators.required],
      endDate: [new Date(), Validators.required],
    });
  }

  generateReport() {
    const { initDate, endDate } = this.form.value;

    this.store.dispatch(
      ExpensesActions.loadByDates({
        initDate: this.transformDate(initDate),
        endDate: this.transformDate(endDate),
      })
    );
  }

  private generatePdf(expenses: Expense[]) {
    const pipe = new DatePipe('es-Es');
    const upper = new UpperCasePipe();

    const head = [['#', 'FECHA', 'QUIEN USÓ', 'PARA QUE USÓ', 'CUANTO USÓ']];
    const data = expenses.map((e, i) => [
      i + 1,
      upper.transform(pipe.transform(e.date, 'EEEE, d MMMM, y')),
      e.to_user,
      e.description,
      formatNumber(e.amount, 'es-ES', '1.2'),
    ]);

    const count = expenses.reduce((counter, item) => counter + item.amount, 0);

    const title = `Reporte de gastos del ${pipe.transform(
      this.form.value.initDate,
      'd MMMM y'
    )} al ${pipe.transform(
      this.form.value.endDate,
      'd MMMM y'
    )}. TOTAL: ${formatNumber(count, 'es-Es', '1.2')}`;

    this.printTableService.generatePdf(title, head, data, 'GASTOS');
  }

  private transformDate(date: Date) {
    const isoDate = date.toISOString();
    const auxDate = isoDate.split('-');
    return `${auxDate[0]}-${auxDate[1]}-${auxDate[2].slice(0, 2)}`;
  }
}
