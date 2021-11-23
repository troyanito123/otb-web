import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Contribution } from '../models/contribution.model';

@Injectable({
  providedIn: 'root',
})
export class ContributionService {
  private url = `${environment.apiUrl}/contributions`;

  constructor(private http: HttpClient) {}

  public getAll(): Observable<Contribution[]> {
    return this.http
      .get<[]>(this.url)
      .pipe(map((res) => res.map((r) => Contribution.fromJson(r))));
  }

  public getOne(id: number): Observable<Contribution> {
    return this.http
      .get(`${this.url}/${id}`)
      .pipe(map((res) => Contribution.fromJson(res)));
  }

  public create(description: string, amount: number): Observable<Contribution> {
    return this.http
      .post(this.url, { description: description.toUpperCase(), amount })
      .pipe(map((res) => Contribution.fromJson(res)));
  }

  public update(
    id: number,
    description: string,
    amount: number
  ): Observable<Contribution> {
    return this.http
      .put(`${this.url}/${id}`, {
        description: description.toUpperCase(),
        amount,
      })
      .pipe(map((res) => Contribution.fromJson(res)));
  }

  public remove(id: number): Observable<Contribution> {
    return this.http
      .delete(`${this.url}/${id}`)
      .pipe(map((res) => Contribution.fromJson(res)));
  }
}
