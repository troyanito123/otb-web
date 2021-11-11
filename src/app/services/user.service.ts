import { HttpClient, HttpParams } from '@angular/common/http';
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

  public getAll(
    keyword: string = '',
    sort: string = 'ASC',
    page: number = 0,
    take: number = 10
  ): Observable<{ users: User[]; count: number }> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('take', take.toString())
      .set('sort', sort.toUpperCase())
      .set('keyword', keyword.toUpperCase());

    return this.http
      .get<{ users: []; count: number }>(this.url, { params })
      .pipe(
        map(({ users, count }) => ({
          users: users.map((r) => User.fromJson(r)),
          count,
        }))
      );
  }

  public create(
    name: string,
    block_number: string,
    address_number: string
  ): Observable<User> {
    return this.http
      .post(this.url, {
        name: name.toUpperCase(),
        block_number: block_number.toUpperCase(),
        address_number: address_number.toUpperCase(),
      })
      .pipe(map((res) => User.fromJson(res)));
  }

  public getOne(id: number) {
    return this.http
      .get(`${this.url}/${id}`)
      .pipe(map((res) => User.fromJson(res)));
  }

  public update(
    id: number,
    name: string,
    block_number: string,
    address_number: string,
    status: string,
    role: string
  ) {
    return this.http
      .put(`${this.url}/${id}`, {
        name: name.toUpperCase(),
        block_number: block_number.toUpperCase(),
        address_number: address_number.toUpperCase(),
        status,
        roleId: Number(role),
      })
      .pipe(map((res) => User.fromJson(res)));
  }

  public remove(id: number) {
    return this.http
      .delete(`${this.url}/${id}`)
      .pipe(map((res) => User.fromJson(res)));
  }
}
