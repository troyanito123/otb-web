import { DatePipe, formatNumber, UpperCasePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import {
  ExtraContribution,
  ExtraContributionPaid,
} from 'src/app/models/extra-contribution.interface';
import { PrintTableService } from 'src/app/services/print-table.service';
import { AppState } from 'src/app/state/app.reducer';

@Component({
  selector: 'app-extra-contributions-detail',
  templateUrl: './extra-contributions-detail.component.html',
  styleUrls: ['./extra-contributions-detail.component.scss'],
})
export class ExtraContributionsDetailComponent implements OnInit, OnDestroy {
  public extraContribution?: ExtraContribution;
  public payments: ExtraContributionPaid[] = [];
  public total = 0;
  public displayedColumns = ['name', 'date', 'amount'];
  private exContrSubs?: Subscription;

  constructor(
    private store: Store<AppState>,
    private printTableService: PrintTableService
  ) {}

  ngOnInit(): void {
    this.exContrSubs = this.store
      .select('extraContributions')
      .subscribe(({ extraContribution, error }) => {
        this.extraContribution = extraContribution;
        this.payments = extraContribution?.extra_contributions_paid || [];
        this.total = this.payments.reduce((counter, item) => counter + item.amount,0);
      });
  }

  ngOnDestroy(): void {
    this.exContrSubs?.unsubscribe();
  }

  public generateList() {
    const datePipe = new DatePipe('es-Es');
    const upperPipe = new UpperCasePipe();
    const head = [['#', 'FECHA', 'QUIEN PAGÓ', 'CUANTO PAGÓ']];
    const data = this.payments.map((e, i) => [
      i + 1,
      upperPipe.transform(datePipe.transform(e.date, 'EEEE d MMMM, y')),
      e.user.name,
      formatNumber(e.amount, 'es-ES', '1.2'),
    ]);
    const count = this.payments.reduce(
      (counter, item) => counter + item.amount,
      0
    );

    const title = `${this.extraContribution!.name}. TOTAL: ${formatNumber(
      count,
      'es-Es',
      '1.2'
    )}, Aportantes: ${this.payments.length}`;

    this.printTableService.generatePdf(
      title,
      head,
      data,
      this.extraContribution!.name
    );
  }
}
