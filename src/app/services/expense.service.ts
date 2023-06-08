import { HttpClient, HttpParams } from '@angular/common/http';
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

  public getAll(
    keyword: string = '',
    sort: string = 'ASC',
    page: number = 0,
    take: number = 10
  ) {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('take', take.toString())
      .set('sort', sort.toUpperCase())
      .set('keyword', keyword.toUpperCase());

    return this.http
      .get<{ expenses: []; count: number }>(this.url, { params })
      .pipe(
        map(({ expenses, count }) => ({
          expenses: expenses.map((r) => Expense.fromJson(r)),
          count,
        }))
      );
  }

  public getOne(id: number) {
    return this.http
      .get(`${this.url}/${id}`)
      .pipe(map((res) => Expense.fromJson(res)));
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
        description: description.toUpperCase(),
        amount,
        date,
        from_user: from_user.toUpperCase(),
        to_user: to_user.toUpperCase(),
      })
      .pipe(map((res) => Expense.fromJson(res)));
  }

  public update(
    id: number,
    description: string,
    amount: number,
    date: Date,
    from_user: string,
    to_user: string
  ) {
    return this.http
      .put(`${this.url}/${id}`, {
        description,
        amount,
        date,
        from_user,
        to_user,
      })
      .pipe(map((res) => Expense.fromJson(res)));
  }

  public remove(id: number) {
    return this.http
      .delete(`${this.url}/${id}`)
      .pipe(map((res) => Expense.fromJson(res)));
  }

  public getTotalAmount() {
    return this.http.get<{ total: string }>(`${this.url}/total-amount`);
  }

  public getByDateRange(initDate: string, endDate: string) {
    return this.http
      .post<[]>(`${this.url}/bydate`, {
        initDate: initDate,
        endDate: endDate,
      })
      .pipe(map((res) => res.map((r) => Expense.fromJson(r))));
  }
}
