import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { fromEvent, merge, Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.reducer';
import * as UsersActions from 'src/app/state/actions/users.action';

import { User } from 'src/app/models/user.model';
import { cleanUser } from 'src/app/state/actions/user.action';
import { UserService } from 'src/app/services/user.service';
import { UsersDataSource } from './users-datasource';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit, OnDestroy, AfterViewInit {
  dataSource!: UsersDataSource;
  displayedColumns = ['name', 'block-number', 'address-number'];

  page = 0;
  take = 5;
  sortTable = 'ASC';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  @ViewChild('keyword') keyword!: ElementRef;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.dataSource = new UsersDataSource(this.userService);
    this.dataSource.loadUsers('', this.sortTable, this.page, this.take);
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    fromEvent(this.keyword.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;

          this.loadUsersPage();
        })
      )
      .subscribe();

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(tap(() => this.loadUsersPage()))
      .subscribe();
  }

  ngOnDestroy(): void {}

  private loadUsersPage() {
    this.dataSource.loadUsers(
      this.keyword.nativeElement.value,
      this.sort.direction,
      this.paginator.pageIndex,
      this.paginator.pageSize
    );
  }
}
