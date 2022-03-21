import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

import {
  ExtraContribution,
  ExtraContributionData,
  ExtraContributionPaid,
  ExtraContributionPayMade,
} from '../models/extra-contribution.interface';

@Injectable({
  providedIn: 'root',
})
export class ExtraContributionService {
  private url = `${environment.apiUrl}/extra-contributions`;

  constructor(private http: HttpClient) {}

  public getAll() {
    return this.http.get<ExtraContribution[]>(this.url);
  }

  public getOne(id: number) {
    return this.http.get<ExtraContribution>(`${this.url}/${id}`);
  }

  public getByUser(id: number) {
    return this.http.get<ExtraContributionPayMade[]>(
      `${this.url}/byuser/${id}`
    );
  }

  public create({ name, description, amount }: ExtraContributionData) {
    return this.http.post<ExtraContribution>(this.url, {
      name,
      description,
      amount,
    });
  }

  public update(
    id: number,
    { name, description, status }: Omit<ExtraContributionData, 'amount'>
  ) {
    return this.http.put<ExtraContribution>(`${this.url}/${id}`, {
      name,
      description,
      status,
    });
  }

  public payment(userId: number, extraContributionId: number) {
    const date = new Date().toISOString();
    return this.http.post<ExtraContributionPaid>(`${this.url}/payment`, {
      userId,
      extraContributionId,
      date,
    });
  }
}
