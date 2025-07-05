import { Component, inject } from '@angular/core'
import { Store } from '@ngrx/store'
import { authFeature } from '@state/reducers/auth.reducer'

@Component({
    selector: 'app-expenses',
    templateUrl: './expenses.component.html',
    styleUrls: ['./expenses.component.scss'],
    standalone: false
})
export class ExpensesComponent {
  readonly auth$ = inject(Store).select(authFeature.selectUser)
}
