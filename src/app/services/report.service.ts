import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  readonly http = inject(HttpClient)
  readonly REPORT_ENDPOINT = `${environment.apiUrl}/report`

  getMonthlyPaymentReport(year: string) {
    return this.http.get(`${this.REPORT_ENDPOINT}/users-monthly-payments-matrix`, {
      params: { year },
    })
  }
  getAttendencesReport(year: string) {
    return this.http.get(`${this.REPORT_ENDPOINT}/users-meetings-matrix`, {
      params: { year },
    })
  }
}
