import { Component, OnInit } from '@angular/core';
import { CertificationService } from 'src/app/services/certification.service';
import { ContributionPaidService } from 'src/app/services/contribution-paid.service';
import { ExpenseService } from 'src/app/services/expense.service';
import { MonthlyPaymentMadeService } from 'src/app/services/monthly-payment-made.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent implements OnInit {
  certificationsTotal!: number;
  contributionsTotal!: number;
  expensesTotal!: number;
  monthlyPaymentsTotal!: number;

  get incomeTotal() {
    return (
      this.certificationsTotal +
      this.contributionsTotal +
      this.monthlyPaymentsTotal
    );
  }

  get inBox() {
    return this.incomeTotal - this.expensesTotal;
  }

  constructor(
    private certificationService: CertificationService,
    private contributionsPaidService: ContributionPaidService,
    private expenseService: ExpenseService,
    private monthlyPaymentMade: MonthlyPaymentMadeService
  ) {}

  ngOnInit(): void {
    this.certificationService
      .getTotalAmount()
      .subscribe(({ total }) => (this.certificationsTotal = Number(total)));

    this.contributionsPaidService
      .getTotalAmount()
      .subscribe(({ total }) => (this.contributionsTotal = Number(total)));

    this.expenseService
      .getTotalAmount()
      .subscribe(({ total }) => (this.expensesTotal = Number(total)));

    this.monthlyPaymentMade
      .getTotalAmount()
      .subscribe(({ total }) => (this.monthlyPaymentsTotal = Number(total)));
  }
}
