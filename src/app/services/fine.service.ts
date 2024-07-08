import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { environment } from 'src/environments/environment'
import { Fine } from '../models/fine.model'
import { PreFinesPaid } from '@models/pre-fines-paid.model'

@Injectable({
  providedIn: 'root',
})
export class FineService {
  private url = `${environment.apiUrl}/fines`

  constructor(private http: HttpClient) {}

  public getByUser(id: number): Observable<Fine[]> {
    return this.http
      .get<[]>(`${this.url}/user/${id}`)
      .pipe(map((res) => res.map((r) => Fine.fromJson(r))))
  }

  public getByDate(initDate: string, endDate: string) {
    return this.http
      .post<[]>(`${this.url}/bydate`, { initDate, endDate })
      .pipe(map((res) => res.map((r) => Fine.fromJson(r))))
  }

  public createMany(userId: number, date: Date, meetingIds: string) {
    return this.http
      .post<[]>(`${this.url}/many`, { userId, date, meetingIds })
      .pipe(map((res) => res.map((r) => Fine.fromJson(r))))
  }

  public getTotalAmount() {
    return this.http.get<{ total: string }>(`${this.url}/total-amount`)
  }

  public loadAllFinesByUser(userId: number) {
    return this.http
      .get<{fines: []}>(`${this.url}/meetings-user/${userId}`)
      .pipe(map((data) => data.fines.map(PreFinesPaid.fromJson)))
  }
}
