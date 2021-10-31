import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Role } from '../models/role.model';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private url = `${environment.apiUrl}/roles`;

  constructor(private http: HttpClient) {}

  public getAll(): Observable<Role[]> {
    return this.http
      .get<any[]>(this.url)
      .pipe(map((res) => res.map((r) => Role.fromJson(r))));
  }
}
