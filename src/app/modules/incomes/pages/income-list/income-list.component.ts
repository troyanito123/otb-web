import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { fromEvent, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { IncomeService } from 'src/app/services/income.service';
import { IncomeDataSource } from './income-datasource';

@Component({
  selector: 'app-income-list',
  templateUrl: './income-list.component.html',
  styleUrls: ['./income-list.component.scss'],
})
export class IncomeListComponent implements OnInit, AfterViewInit {
  dataSource!: IncomeDataSource;
  displayedColumns = ['date', 'user', 'amount'];

  page = 0;
  take = 10;
  sortTable = 'ASC';
  column = 'date';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  public inputKeyword = new FormControl('');

  public size!: number;

  constructor(private incomeServcie: IncomeService) {}

  ngOnInit(): void {
    this.dataSource = new IncomeDataSource(this.incomeServcie);
    this.dataSource.loadData(
      '',
      this.sortTable,
      this.page,
      this.take,
      this.column
    );
    this.dataSource.size$.subscribe((res) => (this.size = res));
  }

  ngAfterViewInit() {
    this.sort?.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(tap(() => this.loadExpensesPage()))
      .subscribe();
  }

  public search() {
    this.paginator.pageIndex = 0;
    this.loadExpensesPage();
  }

  public clean() {
    this.inputKeyword.setValue('');
    this.paginator.pageIndex = 0;
    this.loadExpensesPage();
  }

  private loadExpensesPage() {
    this.dataSource.loadData(
      this.inputKeyword.value!,
      this.sort.direction,
      this.paginator.pageIndex,
      this.paginator.pageSize,
      this.sort.active
    );
  }
}
