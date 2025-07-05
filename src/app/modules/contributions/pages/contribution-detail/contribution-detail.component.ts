import { Component, inject } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'

import { Store } from '@ngrx/store'
import { ContributionActions } from 'src/app/state/actions/contribution.action'

import { DeleteDialogComponent } from 'src/app/layouts/delete-dialog/delete-dialog.component'
import { contributionFeature } from '@state/reducers/contribution.reducer'

@Component({
    selector: 'app-contribution-detail',
    template: `
    <div class="flex-column-center-center">
      @if (contribution$ | async; as contribution) {
        <mat-card appearance="outlined" style="width: 80%">
          <mat-card-header>
            <mat-card-title>Aporte</mat-card-title>
          </mat-card-header>
          @if (contribution) {
            <mat-card-content>
              <p><strong>Descripción: </strong> {{ contribution.description }}</p>
              <p><strong>Aporte: </strong> {{ contribution.amount }}</p>
            </mat-card-content>
          }
          <mat-card-actions>
            <div class="flex-row-end-center">
              <button mat-button color="warn" (click)="remove(contribution.id)">Eliminar</button>
            </div>
          </mat-card-actions>
        </mat-card>
      }
    </div>
    `,
    standalone: false
})
export class ContributionDetailComponent {
  #store = inject(Store)
  #matDialog = inject(MatDialog)
  readonly contribution$ = this.#store.select(contributionFeature.selectContribution)

  public remove(id: number) {
    const dialog = this.#matDialog.open(DeleteDialogComponent, {
      data: { name: 'aporte' },
    })
    dialog.afterClosed().subscribe((result) => {
      if (result)
        this.#store.dispatch(
          ContributionActions.remove({
            id,
            forward: 'private/contributions/list',
            messageSupplier: (text: string) => `Aporte \"${text}\" ha sido eliminado`,
          })
        )
    })
  }
}
