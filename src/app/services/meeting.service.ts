import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { environment } from 'src/environments/environment'

import { Meeting, MeetingData } from '../models/meeting.model'

@Injectable({
  providedIn: 'root',
})
export class MeetingService {
  private url = `${environment.apiUrl}/meetings`

  constructor(private http: HttpClient) {}

  public getAll(): Observable<Meeting[]> {
    return this.http.get<[]>(this.url).pipe(map((res) => res.map((r) => Meeting.fromJson(r))))
  }

  public getOne(id: number) {
    return this.http.get(`${this.url}/${id}`).pipe(map((res) => Meeting.fromJson(res)))
  }

  public create({ name, description, date, fine_amount, conclutions }: MeetingData) {
    return this.http
      .post(this.url, {
        name: name.toUpperCase(),
        description,
        date,
        fine_amount,
        conclutions,
      })
      .pipe(map((res) => Meeting.fromJson(res)))
  }

  public update(id: number, { name, description, date, fine_amount, conclutions }: MeetingData) {
    return this.http
      .put(`${this.url}/${id}`, {
        name,
        description,
        date,
        fine_amount,
        conclutions,
      })
      .pipe(map((res) => Meeting.fromJson(res)))
  }

  public remove(id: number) {
    return this.http.delete(`${this.url}/${id}`).pipe(map((res) => Meeting.fromJson(res)))
  }
}
