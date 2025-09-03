import { Component, inject } from '@angular/core'
import { FormControl, Validators } from '@angular/forms'
import { PrintTableService } from '@services/print-table.service'
import { ReportService } from '@services/report.service'
import { YEARS } from 'src/app/utils/gobal-data'

@Component({
  selector: 'app-report-list-format',
  templateUrl: './report-list-format.component.html',
  styleUrl: './report-list-format.component.scss',
  standalone: false,
})
export class ReportListFormatComponent {
  readonly reportService = inject(ReportService)
  readonly printTableService = inject(PrintTableService)

  readonly YEARS = YEARS
  readonly yearControl = new FormControl('2025', [Validators.required])

  getMonthlyPaymentReport() {
    const year = this.yearControl.value
    if (!year) return
    this.reportService.getMonthlyPaymentReport(year).subscribe((data: any) => {
      console.log(data)
      this.printTableService.generatePdf({
        body: data.rows,
        title: 'Mensualidades',
        head: [data.headers],
        type: 'PAGOS_MENSUALES',
        subtitle: `Gestión ${year}`,
        orientation: 'landscape',
        format: [210, 320],
      })
    })
  }

  getAttendencesReport() {
    const year = this.yearControl.value
    if (!year) return
    this.reportService.getAttendencesReport(year).subscribe((data: any) => {
      console.log(data)
      this.printTableService.generatePdf({
        body: data.rows,
        title: 'Multas',
        head: [data.headers],
        type: 'ASISTENCIAS',
        subtitle: `Gestión ${year}`,
        orientation: 'landscape',
        format: [210, 320],
      })
    })
  }
}
