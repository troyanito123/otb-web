import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { Meeting } from '../models/meeting.model';

@Injectable({
  providedIn: 'root',
})
export class MeetingService {
  private url = `${environment.apiUrl}/meetings`;

  constructor(private http: HttpClient) {}

  public getAll(): Observable<Meeting[]> {
    return this.http
      .get<[]>(this.url)
      .pipe(map((res) => res.map((r) => Meeting.fromJson(r))));
  }
}
