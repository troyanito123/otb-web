import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

export class UsersDataSource implements DataSource<User> {
  private recordsSubject = new BehaviorSubject<User[]>([]);

  private loadingSubject = new BehaviorSubject<boolean>(false);

  private sizeSubject = new BehaviorSubject<number>(0);

  public loading$ = this.loadingSubject.asObservable();
  public size$ = this.sizeSubject.asObservable();

  constructor(private userService: UserService) {}

  loadUsers(keyword: string, sort: string, page: number, take: number) {
    this.loadingSubject.next(true);
    this.userService
      .getAll(keyword, sort, page, take)
      .pipe(
        catchError(() => of({ count: 0, users: [] })),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe(({ count, users }) => {
        this.sizeSubject.next(count);
        this.recordsSubject.next(users);
      });
  }

  connect(collectionViewer: CollectionViewer): Observable<User[]> {
    return this.recordsSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.recordsSubject.complete();
    this.loadingSubject.complete();
    this.sizeSubject.complete();
  }
}
