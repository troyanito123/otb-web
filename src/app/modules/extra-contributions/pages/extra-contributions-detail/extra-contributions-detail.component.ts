import { DatePipe, UpperCasePipe, formatNumber } from '@angular/common'
import { Component } from '@angular/core'
import { ExtraContributionPaid } from '@models/extra-contribution.interface'
import { Store } from '@ngrx/store'
import { authFeature } from '@state/reducers/auth.reducer'
import { extraContributionFeature } from '@state/reducers/extra-contribution.reducer'

import { PrintTableService } from 'src/app/services/print-table.service'

@Component({
  selector: 'app-extra-contributions-detail',
  templateUrl: './extra-contributions-detail.component.html',
  styleUrls: ['./extra-contributions-detail.component.scss'],
})
export class ExtraContributionsDetailComponent {
  readonly displayedColumns = ['name', 'date', 'amount']

  readonly auth$ = this.store.select(authFeature.selectUser)
  readonly extraContribution$ = this.store.select(extraContributionFeature.selectExtraContribution)
  readonly payments$ = this.store.select(extraContributionFeature.payments)
  readonly total$ = this.store.select(extraContributionFeature.total)

  constructor(private store: Store, private printTableService: PrintTableService) {}

  public generateList(payments: ExtraContributionPaid[], name: string) {
    const datePipe = new DatePipe('es-Es')
    const upperPipe = new UpperCasePipe()
    const head = [['#', 'FECHA', 'QUIEN PAGÓ', 'CUANTO PAGÓ']]
    const data = payments.map((e, i) => [
      i + 1,
      upperPipe.transform(datePipe.transform(e.date, 'EEEE d MMMM, y')),
      e.user.name,
      formatNumber(e.amount, 'es-ES', '1.2'),
    ]);
    const count = payments.reduce(
      (counter, item) => counter + item.amount,
      0
    );

    const title = `${name}. TOTAL: ${formatNumber(
      count,
      'es-Es',
      '1.2'
    )}, Aportantes: ${payments.length}`
    this.printTableService.generatePdf(title, head, data, name)
  }
}
