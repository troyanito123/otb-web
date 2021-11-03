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

  getByUser(userId: number) {
    return this.http
      .get<[]>(`${this.url}/user/${userId}`)
      .pipe(map((res) => res.map((r) => ContributionPaid.fromJson(r))));
  }
}
