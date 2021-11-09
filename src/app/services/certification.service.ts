import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
      .post<[]>(this.url, { description, amount, type, date, userId })
      .pipe(map((res) => Certification.fromJson(res)));
  }

  public getTotalAmount() {
    return this.http.get<{ total: string }>(`${this.url}/total-amount`);
  }
}
