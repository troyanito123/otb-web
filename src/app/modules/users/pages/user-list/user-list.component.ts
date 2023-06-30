import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { merge, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

import { UsersDataSource } from './users-datasource';
import { MatLegacyPaginator as MatPaginator } from '@angular/material/legacy-paginator';
import { MatSort } from '@angular/material/sort';

import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit, OnDestroy, AfterViewInit {
  dataSource!: UsersDataSource;
  displayedColumns = ['name', 'block-number', 'address-number'];

  page = 0;
  take = 15;
  sortTable = 'ASC';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  @ViewChild('keyword') keyword!: ElementRef;

  private sortSubs?: Subscription;
  private paginatorSubs?: Subscription;
  
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.dataSource = new UsersDataSource(this.userService);
    this.dataSource.loadUsers('', this.sortTable, this.page, this.take);
  }

  ngAfterViewInit() {
    this.sortSubs = this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    this.paginatorSubs = merge(this.sort.sortChange, this.paginator.page)
      .pipe(tap(() => this.loadUsersPage()))
      .subscribe();
  }

  ngOnDestroy(): void {
    this.sortSubs?.unsubscribe()
    this.paginatorSubs?.unsubscribe()
  }

  search(){
    this.paginator.pageIndex = 0;
    this.loadUsersPage();
  }

  private loadUsersPage() {
    this.dataSource.loadUsers(
      this.keyword.nativeElement.value,
      this.sort.direction,
      this.paginator.pageIndex,
      this.paginator.pageSize
    );
  }
}
