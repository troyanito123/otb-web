import { CollectionViewer, DataSource } from '@angular/cdk/collections';

import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

import { CertificationService } from 'src/app/services/certification.service';
import { Certification } from 'src/app/models/certification.model';

export class CertificationsDataSource implements DataSource<Certification> {
  private certificationsSubject = new BehaviorSubject<Certification[]>([]);

  private loadingSubject = new BehaviorSubject<boolean>(false);

  private sizeSubject = new BehaviorSubject<number>(0);

  public loading$ = this.loadingSubject.asObservable();
  public size$ = this.sizeSubject.asObservable();

  constructor(private certificationService: CertificationService) {}

  loadCertifications(
    keyword: string,
    page: number,
    take: number,
    sort: string,
    column: string
  ) {
    this.loadingSubject.next(true);
    this.certificationService
      .getAll(keyword, page, take, sort, column)
      .pipe(
        catchError(() => of({ count: 0, certifications: [] })),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe(({ count, certifications }) => {
        this.sizeSubject.next(count);
        this.certificationsSubject.next(certifications);
      });
  }

  connect(collectionViewer: CollectionViewer): Observable<Certification[]> {
    console.log('Connecting data source');
    return this.certificationsSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.certificationsSubject.complete();
    this.loadingSubject.complete();
    this.sizeSubject.complete();
  }
}
