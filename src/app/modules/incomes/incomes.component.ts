import { Component } from '@angular/core'

@Component({
  selector: 'app-incomes',
  template: `
    <div style="margin: 1rem">
      <div class="flex-row-end-center" style="margin-bottom: 1rem">
        <button mat-raised-button [routerLink]="['list']" routerLinkActive="active">Lista</button>
      </div>
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [],
})
export class IncomesComponent {}
