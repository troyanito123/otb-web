import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Store } from '@ngrx/store'
import { ContributionActions } from 'src/app/state/actions/contribution.action'
import { AppState } from 'src/app/state/app.reducer'

@Component({
  selector: 'app-contribution-view',
  template: `
    <div class="flex-row-start-center">
      <button mat-raised-button [routerLink]="['./detail']" routerLinkActive="active">
        DETALLE
      </button>
      <button mat-raised-button [routerLink]="['./edit']" routerLinkActive="active">Editar</button>
    </div>

    <div class="m-top-1">
      <router-outlet></router-outlet>
    </div>
  `,
})
export class ContributionViewComponent implements OnInit, OnDestroy {
  constructor(private store: Store<AppState>, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(({ id }) => this.store.dispatch(ContributionActions.load({ id })))
  }

  ngOnDestroy(): void {
    this.store.dispatch(ContributionActions.clean())
  }
}
