import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Fine } from '../models/fine.model';

@Injectable({
  providedIn: 'root',
})
export class FineService {
  private url = `${environment.apiUrl}/fines`;

  constructor(private http: HttpClient) {}

  public getByUser(id: number): Observable<Fine[]> {
    return this.http
      .get<[]>(`${this.url}/user/${id}`)
      .pipe(map((res) => res.map((r) => Fine.fromJson(r))));
  }

  public createMany(userId: number, date: Date, meetingIds: string) {
    console.log({ userId, date, meetingIds });
    return this.http
      .post<[]>(`${this.url}/many`, { userId, date, meetingIds })
      .pipe(map((res) => res.map((r) => Fine.fromJson(r))));
  }
}
