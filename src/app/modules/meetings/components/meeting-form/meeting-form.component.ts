import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';

import { Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.reducer';
import * as MeetingActions from 'src/app/state/actions/meeting.actions';

import { AlertComponent } from 'src/app/layouts/alert/alert.component';
import { Meeting } from 'src/app/models/meeting.model';
@Component({
  selector: 'app-meeting-form',
  templateUrl: './meeting-form.component.html',
  styleUrls: ['./meeting-form.component.scss'],
})
export class MeetingFormComponent implements OnInit, OnDestroy {
  @Input() meeting!: Meeting;

  form!: FormGroup;

  meetingSubs!: Subscription;

  get isEditing() {
    return !!this.meeting;
  }

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private router: Router,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.subscribeStore();
  }

  ngOnDestroy(): void {
    this.meetingSubs?.unsubscribe();
    this.store.dispatch(MeetingActions.formClean());
  }

  save() {
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
    const { name, date, description, fine_amount, conclutions } =
      this.form.value;
    this.store.dispatch(
      MeetingActions.create({
        name,
        date,
        description,
        fine_amount,
        conclutions,
      })
    );
  }
  private update() {
    const { name, date, description, fine_amount, conclutions } =
      this.form.value;
    this.store.dispatch(
      MeetingActions.update({
        id: this.meeting!.id,
        name,
        date,
        description,
        fine_amount,
        conclutions,
      })
    );
  }

  private subscribeStore() {
    this.meetingSubs = this.store
      .select('meeting')
      .subscribe(({ meeting, updated, created, error }) => {
        if (updated) this.handledSuccess(meeting);
        if (created) this.handledSuccess(meeting);
        if (error) this.handledError();
      });
  }

  private handledSuccess(meeting: Meeting | null) {
    this.router.navigate(['private/meetings', meeting!.id]);
  }

  private handledError() {
    this.matDialog.open(AlertComponent, {
      data: {
        title: 'Error al guardar',
        content: 'Por favor revise los datos del formulario',
      },
    });
  }

  private createForm() {
    this.form = this.fb.group({
      name: [
        this.meeting ? this.meeting.name : '',
        [Validators.required, Validators.minLength(6)],
      ],
      date: [
        this.meeting ? this.meeting.date : new Date().toISOString(),
        [Validators.required],
      ],
      description: [
        this.meeting ? this.meeting.description : '',
        [Validators.required, Validators.minLength(6)],
      ],
      conclutions: [this.meeting ? this.meeting.conclutions : ''],

      fine_amount: [
        this.meeting ? this.meeting.fine_amount : 20,
        [Validators.required, Validators.min(0), Validators.max(1000)],
      ],
    });
  }
}
