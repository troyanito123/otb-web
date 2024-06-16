import { Injectable } from '@angular/core'

import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

export type PDFInput = { title: string; head: string[][]; body: any[][]; type: string }

@Injectable({
  providedIn: 'root',
})
export class PrintTableService {
  constructor() {}

  public generatePdf({title, head, body, type}: PDFInput) {
    const doc = new jsPDF()

    doc.setFontSize(12)
    doc.text(title, 11, 11)
    autoTable(doc, {
      head,
      body,
      theme: 'grid',
      headStyles: { fillColor: '#3F51B5' },
    })
    doc.save(`REPORTE DE ${type.toUpperCase()}`)
  }
}
