import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Expense } from '../models/expense.model';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  private url = `${environment.apiUrl}/expenses`;

  constructor(private http: HttpClient) {}

  public getAll() {
    return this.http
      .get<[]>(this.url)
      .pipe(map((res) => res.map((r) => Expense.fromJson(r))));
  }

  public create(
    description: string,
    amount: number,
    date: Date,
    from_user: string,
    to_user: string
  ) {
    return this.http
      .post(this.url, {
        description,
        amount,
        date,
        from_user,
        to_user,
      })
      .pipe(map((res) => Expense.fromJson(res)));
  }
}
