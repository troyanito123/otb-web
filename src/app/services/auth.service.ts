import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import { DataLocalService } from './data-local.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = `${environment.apiUrl}/auth`;

  constructor(
    private http: HttpClient,
    private dataLocalService: DataLocalService
  ) {}

  public signin(email: string, password: string) {
    return this.http.post(`${this.url}/login`, { email, password }).pipe(
      map((res: any) => ({
        user: User.fromJson(res.data),
        access_token: res.access_token,
      })),
      tap((res) => this.saveAccessToken(res.access_token))
    );
  }

  public signout() {
    return of(this.dataLocalService.removeItem('access_token'));
  }

  public renew() {
    return this.http.get(`${this.url}/renew`).pipe(
      map((res: any) => ({
        user: User.fromJson(res.data),
        access_token: res.access_token,
      })),
      tap((res) => this.saveAccessToken(res.access_token))
    );
  }

  private saveAccessToken(access_token: string) {
    this.dataLocalService.setItem('access_token', `Bearer ${access_token}`);
  }
}
