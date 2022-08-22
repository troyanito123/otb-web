import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@state/app.reducer';
import { Expense } from '@models/expense.model';

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-expenses-receipt',
  templateUrl: './expenses-receipt.component.html',
  styleUrls: ['./expenses-receipt.component.scss'],
})
export class ExpensesReceiptComponent implements OnInit {
  public expense!: Expense | null;
  @ViewChild('receipt', { static: true }) receipt?: ElementRef;
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.select('expense').subscribe(({ expense }) => {
      this.expense = expense;
    });
  }

  public print() {
    const toPrint = this.receipt?.nativeElement;
    html2canvas(toPrint!).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const doc = new jsPDF();
      doc.addImage(imgData, 'letter', 5, 15, 200, 120);
      doc.addImage(imgData, 'letter', 5, 160, 200, 120);
      doc.save(`${this.expense?.to_user}.pdf`);
    });
  }
}
