import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { MonthlyPayment } from '../models/monthly-payment.model';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private url = `${environment.apiUrl}/monthly-payments`;

  constructor(private http: HttpClient) {}

  public getMonthlyPaymentsByYear(year: string) {
    const params = new HttpParams().append('year', year);
    return this.http
      .get<[]>(this.url, { params })
      .pipe(map((res) => res.map((r) => MonthlyPayment.fromJson(r))));
  }
}
