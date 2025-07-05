import { Component, OnInit } from '@angular/core'

@Component({
    selector: 'app-contributions',
    template: `
    <div style="margin: 1rem">
      <div class="flex-row-end-center">
        <button mat-raised-button [routerLink]="['./list']" routerLinkActive="active">Lista</button>
        <button mat-raised-button [routerLink]="['./new']" routerLinkActive="active">Nuevo</button>
      </div>

      <router-outlet></router-outlet>
    </div>
  `,
    standalone: false
})
export class ContributionsComponent {}
