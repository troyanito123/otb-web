import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';

import { Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.reducer';
import { AttendencesActions } from 'src/app/state/actions/attendences.actions';
import { MeetingsActions } from 'src/app/state/actions/meetings.actions';

import { Meeting } from 'src/app/models/meeting.model';
import { Attendence } from 'src/app/models/attendence.model';
import { PrintTableService } from 'src/app/services/print-table.service';

@Component({
  selector: 'app-report-attendences',
  templateUrl: './report-attendences.component.html',
  styleUrls: ['./report-attendences.component.scss'],
})
export class ReportAttendencesComponent implements OnInit, OnDestroy {
  public meetings: Meeting[] = [];
  private meetingsSubs!: Subscription;

  private attendecesSubs!: Subscription;

  public meetingInput!: UntypedFormControl;

  constructor(
    private store: Store<AppState>,
    private printTableService: PrintTableService
  ) {}

  ngOnInit(): void {
    this.store.dispatch(MeetingsActions.load());

    this.meetingsSubs = this.store
      .select('meetings')
      .subscribe(({ meetings }) => {
        this.meetings = meetings;
        this.meetingInput = new UntypedFormControl(
          meetings.length ? meetings[0] : '',
          Validators.required
        );
      });

    this.attendecesSubs = this.store
      .select('attendences')
      .subscribe(({ attendences, loaded }) => {
        if (loaded) {
          this.generatePdf(attendences);
        }
      });
  }

  ngOnDestroy(): void {
    this.store.dispatch(AttendencesActions.clean());
    this.store.dispatch(MeetingsActions.clean());
    this.meetingsSubs?.unsubscribe();
    this.attendecesSubs?.unsubscribe();
  }

  public generateReport() {
    this.store.dispatch(
      AttendencesActions.loadByMeeting({
        meetingId: this.meetingInput.value.id,
      })
    );
  }

  private generatePdf(attendences: Attendence[]) {
    const head = [['#', 'NOMBRE', 'FIRMA']];
    const data = attendences.map((a, i) => [i + 1, a.user.name, '']);

    const title = `LISTA DE ASISTENCIA DE: ${this.meetingInput.value.name}`;

    this.printTableService.generatePdf(title, head, data, 'ASISTENCIAS');
  }
}
