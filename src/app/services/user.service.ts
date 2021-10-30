import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) {}

  public getAll(): Observable<User[]> {
    return this.http
      .get<any[]>(this.url)
      .pipe(map((res) => res.map((r) => User.fromJson(r))));
  }

  public create(
    name: string,
    email: string,
    password: string,
    identification_number: string,
    block_number: string,
    address_number: string
  ): Observable<User> {
    return this.http
      .post(this.url, {
        name,
        email,
        password,
        identification_number,
        block_number,
        address_number,
      })
      .pipe(map((res) => User.fromJson(res)));
  }
}
