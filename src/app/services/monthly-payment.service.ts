import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { map } from 'rxjs/operators'
import { environment } from 'src/environments/environment'
import { MonthlyPayment } from '../models/monthly-payment.model'

@Injectable({
  providedIn: 'root',
})
export class MonthlyPaymentService {
  private url = `${environment.apiUrl}/monthly-payments`

  constructor(private http: HttpClient) {}

  public getMonthlyPaymentsByYear(year: string) {
    const params = new HttpParams().append('year', year)
    return this.http
      .get<[]>(this.url, { params })
      .pipe(map((res) => res.map((r) => MonthlyPayment.fromJson(r))))
  }

  public getOne(id: number) {
    return this.http.get(`${this.url}/${id}`).pipe(map((res) => MonthlyPayment.fromJson(res)))
  }

  public create(year: string, month: string, amount: number) {
    return this.http
      .post(this.url, { year, month, amount })
      .pipe(map((res) => MonthlyPayment.fromJson(res)))
  }

  public update(id: number, year: string, month: string, amount: number) {
    return this.http
      .put(`${this.url}/${id}`, { year, month, amount })
      .pipe(map((res) => MonthlyPayment.fromJson(res)))
  }

  public remove(id: number) {
    return this.http.delete(`${this.url}/${id}`).pipe(map((res) => MonthlyPayment.fromJson(res)))
  }
}
