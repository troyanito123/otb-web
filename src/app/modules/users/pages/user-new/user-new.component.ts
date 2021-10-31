import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Role } from 'src/app/models/role.model';
import { loadRoles } from 'src/app/state/actions/role.action';
import { AppState } from 'src/app/state/app.reducer';

@Component({
  selector: 'app-user-new',
  templateUrl: './user-new.component.html',
  styleUrls: ['./user-new.component.scss'],
})
export class UserNewComponent implements OnInit, OnDestroy {
  public roles: Role[] = [];
  private rolesSubs!: Subscription;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(loadRoles());
    this.rolesSubs = this.store
      .select('roles')
      .subscribe(({ roles }) => (this.roles = roles));
  }

  ngOnDestroy(): void {
    this.rolesSubs?.unsubscribe();
  }
}
