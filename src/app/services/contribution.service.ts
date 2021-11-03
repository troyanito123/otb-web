import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Contribution } from '../models/contribution.model';

@Injectable({
  providedIn: 'root',
})
export class ContributionService {
  private url = `${environment.apiUrl}/contributions`;

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http
      .get<[]>(this.url)
      .pipe(map((res) => res.map((r) => Contribution.fromJson(r))));
  }
}
