import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.reducer';
import * as UserActions from 'src/app/state/actions/user.action';

import { User } from 'src/app/models/user.model';
import { Role } from 'src/app/models/role.model';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit, OnDestroy {
  form!: FormGroup;

  @Input() user!: User;
  @Input() roles!: Role[];

  private userSubs!: Subscription;

  get isEditing() {
    return !!this.user;
  }

  status = ['ACTIVE', 'INACTIVE', 'DELETE'];

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private router: Router
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
    const {
      name,
      email,
      password,
      identification_number,
      block_number,
      address_number,
    } = this.form.value;

    this.store.dispatch(
      UserActions.create({
        name,
        email,
        password,
        identification_number,
        block_number,
        address_number,
      })
    );
  }

  private update() {
    const {
      name,
      email,
      identification_number,
      block_number,
      address_number,
      status,
      role,
    } = this.form.value;

    this.store.dispatch(
      UserActions.update({
        id: this.user.id,
        name,
        email,
        identification_number,
        block_number,
        address_number,
        status,
        role,
      })
    );
  }

  private handledSaveFinish(user: User | null) {
    this.form.reset();
    this.router.navigate(['/users', user!.id]);
  }
  private handledError(error: any) {
    alert('ERROR AL CREAR EL USUARIO');
  }

  private createForm() {
    this.form = this.fb.group({
      name: [
        this.user ? this.user.name : 'test 14',
        [Validators.required, Validators.minLength(3)],
      ],
      email: [
        this.user ? this.user.email : 'test14@test.com',
        [Validators.required, Validators.email],
      ],
      password: [
        '',
        this.user ? [] : [Validators.required, Validators.minLength(6)],
      ],
      identification_number: [
        this.user ? this.user.identification_number : '1231dd',
        [Validators.required, Validators.minLength(6)],
      ],
      block_number: [
        this.user ? this.user.block_number : '2b',
        [Validators.required],
      ],
      address_number: [
        this.user ? this.user.address_number : '2b',
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
