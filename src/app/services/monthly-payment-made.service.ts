import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { MonthlyPaymentMade } from '../models/monthly-payment-made';

@Injectable({
  providedIn: 'root',
})
export class MonthlyPaymentMadeService {
  private url = `${environment.apiUrl}/monthly-payments-made`;

  constructor(private http: HttpClient) {}

  public getMonthlyPaymentsMadeByUserAndYear(id: number, year: string) {
    const params = new HttpParams().append('year', year);

    return this.http.get<[]>(`${this.url}/user/${id}`, { params }).pipe(
      map((res) => {
        return res.map((r) => MonthlyPaymentMade.fromJson(r));
      })
    );
  }

  public createManyMonthlyPayments(
    userId: number,
    monthsId: string,
    date: Date
  ) {
    return this.http
      .post<[]>(`${this.url}/many`, { userId, monthsId, date })
      .pipe(map((res) => res.map((r) => MonthlyPaymentMade.fromJson(r))));
  }
}
