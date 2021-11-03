import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Role } from 'src/app/models/role.model';
import { User } from 'src/app/models/user.model';
import { loadRoles } from 'src/app/state/actions/role.action';
import { cleanUser, loadUser } from 'src/app/state/actions/user.action';
import { AppState } from 'src/app/state/app.reducer';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
})
export class UserEditComponent implements OnInit, OnDestroy {
  private userSubs!: Subscription;
  private rolesSubs!: Subscription;

  public user!: User | null;
  public roles: Role[] = [];

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(loadRoles());

    this.userSubs = this.store.select('user').subscribe(({ user }) => {
      this.user = user;
    });

    this.rolesSubs = this.store
      .select('roles')
      .subscribe(({ roles }) => (this.roles = roles));
  }

  ngOnDestroy(): void {
    this.userSubs?.unsubscribe();
    this.rolesSubs?.unsubscribe();
  }
}
