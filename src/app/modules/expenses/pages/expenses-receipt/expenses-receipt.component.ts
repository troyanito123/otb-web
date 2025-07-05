import { Component, inject } from '@angular/core'
import { Store } from '@ngrx/store'
import { Expense } from '@models/expense.model'

import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { expenseFeature } from '@state/reducers/expense.reducer'

@Component({
    selector: 'app-expenses-receipt',
    templateUrl: './expenses-receipt.component.html',
    styleUrls: ['./expenses-receipt.component.scss'],
    standalone: false
})
export class ExpensesReceiptComponent {
  readonly expense$ = inject(Store).select(expenseFeature.selectExpense)

  public print(expense: Expense, element: any) {
    html2canvas(element).then((canvas) => {
      const imgData = canvas.toDataURL('image/png')
      const doc = new jsPDF()
      doc.addImage(imgData, 'letter', 5, 15, 200, 120)
      doc.addImage(imgData, 'letter', 5, 160, 200, 120)
      doc.save(`${expense?.to_user}.pdf`)
    })
  }
}
