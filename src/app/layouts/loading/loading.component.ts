import { Component, inject } from '@angular/core'
import { Store } from '@ngrx/store'
import { attendencesFeature } from '@state/reducers/attendences.reducer'
import { authFeature } from '@state/reducers/auth.reducer'
import { certificationFeature } from '@state/reducers/certification.reducer'
import { certificationsFeature } from '@state/reducers/certifications.reducer'
import { contributionFeature } from '@state/reducers/contribution.reducer'
import { contributionPaidFeature } from '@state/reducers/contributions-paid.reducer'
import { contributionsFeature } from '@state/reducers/contributions.reducer'
import { expenseFeature } from '@state/reducers/expense.reducer'
import { expensesFeature } from '@state/reducers/expenses.reducer'
import { extraContributionFeature } from '@state/reducers/extra-contribution.reducer'
import { meetingFeature } from '@state/reducers/meeting.reducer'
import { meetingsFeature } from '@state/reducers/meetings.reducer'
import { monthlyPaymentFeature } from '@state/reducers/monthly-payment.reducer'
import { monthlyPaymentsMadeFeature } from '@state/reducers/monthly-payments-made.reducer'
import { monthlyPaymentsFeature } from '@state/reducers/monthly-payments.reducer'
import { userFeature } from '@state/reducers/user.reducer'
import { merge } from 'rxjs'

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent {
  #store = inject(Store)

  readonly loading$ = merge(
    this.#store.select(authFeature.selectLoading),
    this.#store.select(userFeature.selectLoading),
    this.#store.select(monthlyPaymentsMadeFeature.selectLoading),
    this.#store.select(contributionPaidFeature.selectLoading),
    this.#store.select(certificationFeature.selectLoading),
    this.#store.select(certificationsFeature.selectLoading),
    this.#store.select(attendencesFeature.selectLoading),
    this.#store.select(expenseFeature.selectLoading),
    this.#store.select(expensesFeature.selectLoading),
    this.#store.select(meetingFeature.selectLoading),
    this.#store.select(meetingsFeature.selectLoading),
    this.#store.select(monthlyPaymentFeature.selectLoading),
    this.#store.select(monthlyPaymentsFeature.selectLoading),
    this.#store.select(contributionFeature.selectLoading),
    this.#store.select(contributionsFeature.selectLoading),
    this.#store.select(extraContributionFeature.selectLoading)
  )
}
