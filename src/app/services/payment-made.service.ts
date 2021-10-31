import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { MonthlyPaymentMade } from '../models/monthly-payment-made';

@Injectable({
  providedIn: 'root',
})
export class PaymentMadeService {
  private url = `${environment.apiUrl}/monthly-payments-made`;

  constructor(private http: HttpClient) {}
  public getMonthlyPaymentsByYear(id: number, year: string) {
    const params = new HttpParams().append('year', year);

    return this.http
      .get<[]>(`${this.url}/user/${id}`, { params })
      .pipe(map((res) => res.map((r) => MonthlyPaymentMade.fromJson(r))));
  }
}
