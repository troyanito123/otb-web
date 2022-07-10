import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IncomeModel } from '../models/income.model';

@Injectable({
  providedIn: 'root',
})
export class IncomeService {
  private url = `${environment.apiUrl}/incomes`;

  constructor(private http: HttpClient) {}

  public getAllWithPagination(
    keyword: string,
    sort: string,
    page: number,
    take: number,
    column: string
  ) {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('take', take.toString())
      .set('sort', sort.toUpperCase())
      .set('keyword', keyword.toUpperCase())
      .set('column', column);
    return this.http
      .get<{ data: []; count: number }>(`${this.url}/pageable`, { params })
      .pipe(
        map(({ data, count }) => ({
          data: data.map((d) => IncomeModel.fromJson(d)),
          count,
        }))
      );
  }

  public getAllByUser(userId: number): Observable<IncomeModel[]> {
    return this.http
      .get<[]>(`${this.url}/byuser/${userId}`)
      .pipe(map((res) => res.map((r) => IncomeModel.fromJson(r))));
  }

  public getOne(id: number): Observable<IncomeModel> {
    return this.http
      .get(`${this.url}/${id}`)
      .pipe(map((res) => IncomeModel.fromJson(res)));
  }

  public create({
    amount,
    description,
    date,
    userId,
  }: any): Observable<IncomeModel> {
    return this.http
      .post(this.url, { amount, description, date, userId })
      .pipe(map((res) => IncomeModel.fromJson(res)));
  }

  public updated(
    id: number,
    { amount, description, date, status }: any
  ): Observable<IncomeModel> {
    return this.http
      .put(`${this.url}/${id}`, { amount, description, date, status })
      .pipe(map((res) => IncomeModel.fromJson(res)));
  }

  public deleted(id: number): Observable<IncomeModel> {
    return this.http
      .delete(`${this.url}/${id}`)
      .pipe(map((res) => IncomeModel.fromJson(res)));
  }
}
