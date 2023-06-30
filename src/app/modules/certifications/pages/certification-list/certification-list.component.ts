import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';

import { MatSort } from '@angular/material/sort';
import { MatLegacyPaginator as MatPaginator } from '@angular/material/legacy-paginator';

import { fromEvent, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

import { CertificationsDataSource } from './certification-datasource';
import { CertificationService } from 'src/app/services/certification.service';

@Component({
  selector: 'app-certification-list',
  templateUrl: './certification-list.component.html',
  styleUrls: ['./certification-list.component.scss'],
})
export class CertificationListComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  dataSource!: CertificationsDataSource;
  displayedColumns = ['date', 'user', 'amount'];

  page = 0;
  take = 5;
  sortTable = 'ASC';
  column = 'date';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  @ViewChild('keyword') keyword!: ElementRef;

  constructor(private certificationService: CertificationService) {}

  ngOnInit(): void {
    this.dataSource = new CertificationsDataSource(this.certificationService);
    this.dataSource.loadCertifications(
      '',
      this.page,
      this.take,
      this.sortTable,
      this.column
    );
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    fromEvent(this.keyword.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;

          this.loadCertificationsPage();
        })
      )
      .subscribe();

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(tap(() => this.loadCertificationsPage()))
      .subscribe();
  }

  ngOnDestroy(): void {}

  private loadCertificationsPage() {
    this.dataSource.loadCertifications(
      this.keyword.nativeElement.value,
      this.paginator.pageIndex,
      this.paginator.pageSize,
      this.sort.direction,
      this.sort.active
    );
  }
}
