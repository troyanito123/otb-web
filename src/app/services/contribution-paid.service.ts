import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ContributionPaid } from '../models/contribution-paid.model';

@Injectable({
  providedIn: 'root',
})
export class ContributionPaidService {
  private url = `${environment.apiUrl}/contributions-paid`;

  constructor(private http: HttpClient) {}

  public getByUser(userId: number) {
    return this.http
      .get<[]>(`${this.url}/user/${userId}`)
      .pipe(map((res) => res.map((r) => ContributionPaid.fromJson(r))));
  }

  public getByDate(initDate: string, endDate: string) {
    return this.http
      .post<[]>(`${this.url}/bydate`, { initDate, endDate })
      .pipe(map((res) => res.map((r) => ContributionPaid.fromJson(r))));
  }

  public create(amount: number, userId: number, contributionId: number) {
    return this.http
      .post(this.url, { amount, userId, contributionId })
      .pipe(map((res) => ContributionPaid.fromJson(res)));
  }

  public crateMany(userId: number, contributionsId: string, date: Date) {
    return this.http
      .post<[]>(`${this.url}/many`, { userId, contributionsId, date })
      .pipe(map((res) => res.map((r) => ContributionPaid.fromJson(r))));
  }

  public getTotalAmount() {
    return this.http.get<{ total: string }>(`${this.url}/total-amount`);
  }
}
