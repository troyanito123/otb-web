import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { IncomeModel } from 'src/app/models/income.model';
import { IncomeService } from 'src/app/services/income.service';

export class IncomeDataSource implements DataSource<IncomeModel> {
  private recordsSubject = new BehaviorSubject<IncomeModel[]>([]);

  private loadingSubject = new BehaviorSubject<boolean>(false);

  private sizeSubject = new BehaviorSubject<number>(0);

  public loading$ = this.loadingSubject.asObservable();
  public size$ = this.sizeSubject.asObservable();

  constructor(private incomeService: IncomeService) {}

  loadData(
    keyword: string,
    sort: string,
    page: number,
    take: number,
    column: string
  ) {
    this.loadingSubject.next(true);
    this.incomeService
      .getAllWithPagination(keyword, sort, page, take, column)
      .pipe(
        catchError(() => of({ count: 0, data: [] })),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe(({ count, data }) => {
        this.sizeSubject.next(count);
        this.recordsSubject.next(data);
      });
  }

  connect(collectionViewer: CollectionViewer): Observable<IncomeModel[]> {
    return this.recordsSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.recordsSubject.complete();
    this.loadingSubject.complete();
    this.sizeSubject.complete();
  }
}
