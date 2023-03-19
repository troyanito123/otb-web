import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

import { Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.reducer';
import * as UserActions from 'src/app/state/actions/user.action';

import { User } from 'src/app/models/user.model';
import { Role } from 'src/app/models/role.model';
import { BLOCKS } from 'src/app/utils/gobal-data';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit, OnDestroy {
  form!: UntypedFormGroup;

  @Input() user!: User;
  @Input() roles!: Role[];
  public blocks = BLOCKS;

  private userSubs!: Subscription;

  get isEditing() {
    return !!this.user;
  }

  status = ['ACTIVE', 'INACTIVE', 'DELETE'];

  constructor(
    private fb: UntypedFormBuilder,
    private store: Store<AppState>,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.userSubs = this.store
      .select('user')
      .subscribe(({ saved, error, user }) => {
        if (saved) this.handledSaveFinish(user);
        if (error) this.handledError(error);
      });
  }

  ngOnDestroy(): void {
    this.store.dispatch(UserActions.savedDefault());
    this.userSubs?.unsubscribe();
  }

  public save() {
    if (this.form.invalid) {
      return;
    }

    if (this.isEditing) {
      this.update();
    } else {
      this.create();
    }
  }

  private create() {
    const { name, block_number, address_number } = this.form.value;

    this.store.dispatch(
      UserActions.create({
        name,
        block_number,
        address_number,
      })
    );
  }

  private update() {
    const {
      name,
      block_number,
      address_number,
      status,
      role,
      email,
      password,
    } = this.form.value;

    this.store.dispatch(
      UserActions.update({
        id: this.user.id,
        name,
        block_number,
        address_number,
        status,
        role,
        email,
        password,
      })
    );
  }

  private handledSaveFinish(user: User | null) {
    this.form.reset();
    this.router.navigate(['../', user!.id], {relativeTo: this.route});
  }
  private handledError(error: any) {
    alert('ERROR AL CREAR EL USUARIO');
  }

  private createForm() {
    this.form = this.fb.group({
      name: [
        this.user ? this.user.name : '',
        [Validators.required, Validators.minLength(3)],
      ],

      email: [this.user ? this.user.email : ''],
      password: [],
      block_number: [
        this.user ? this.user.block_number : this.blocks[0],
        [Validators.required],
      ],
      address_number: [
        this.user ? this.user.address_number : '',
        [Validators.required],
      ],
      role: [
        this.user
          ? this.roles.find((r) => r.code === this.user.role)?.id
          : this.roles[0].id,
        [Validators.required],
      ],
      status: [
        this.user ? this.user.status : this.status[0],
        [Validators.required],
      ],
    });
  }
}
