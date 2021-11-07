import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Attendence } from '../models/attendence.model';

@Injectable({
  providedIn: 'root',
})
export class AttendenceService {
  private url = `${environment.apiUrl}/attendences`;

  constructor(private http: HttpClient) {}

  public getByUser(userId: number): Observable<Attendence[]> {
    return this.http
      .get<[]>(`${this.url}/user/${userId}`)
      .pipe(map((res) => res.map((r) => Attendence.fromJson(r))));
  }
}
