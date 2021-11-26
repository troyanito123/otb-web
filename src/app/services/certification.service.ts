import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import {
  Certification,
  CertificationType,
} from '../models/certification.model';

@Injectable({
  providedIn: 'root',
})
export class CertificationService {
  private url = `${environment.apiUrl}/certifications`;

  constructor(private http: HttpClient) {}

  public create(
    description: string,
    amount: number,
    type: CertificationType,
    date: Date,
    userId: number
  ) {
    return this.http
      .post<[]>(this.url, {
        description: description.toUpperCase(),
        amount,
        type,
        date,
        userId,
      })
      .pipe(map((res) => Certification.fromJson(res)));
  }

  public getTotalAmount() {
    return this.http.get<{ total: string }>(`${this.url}/total-amount`);
  }

  public getAll(): Observable<Certification[]> {
    return this.http
      .get<[]>(this.url)
      .pipe(map((res) => res.map((r) => Certification.fromJson(r))));
  }

  public getOne(id: number): Observable<Certification> {
    return this.http
      .get(`${this.url}/${id}`)
      .pipe(map((res) => Certification.fromJson(res)));
  }

  public updated(
    id: number,
    description: string,
    amount: number,
    type: CertificationType,
    date: Date
  ) {
    return this.http
      .put(`${this.url}/${id}`, {
        description: description.toUpperCase(),
        amount,
        type,
        date,
      })
      .pipe(map((res) => Certification.fromJson(res)));
  }

  public remove(id: number): Observable<Certification> {
    return this.http
      .delete(`${this.url}/${id}`)
      .pipe(map((res) => Certification.fromJson(res)));
  }
}
