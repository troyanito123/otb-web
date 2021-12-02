import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { Subscription } from 'rxjs';

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.reducer';
import * as AttendencesActions from 'src/app/state/actions/attendences.actions';
import * as MeetingsActions from 'src/app/state/actions/meetings.actions';

import { Meeting } from 'src/app/models/meeting.model';
import { Attendence } from 'src/app/models/attendence.model';

@Component({
  selector: 'app-report-attendences',
  templateUrl: './report-attendences.component.html',
  styleUrls: ['./report-attendences.component.scss'],
})
export class ReportAttendencesComponent implements OnInit, OnDestroy {
  public meetings: Meeting[] = [];
  private meetingsSubs!: Subscription;

  private attendecesSubs!: Subscription;

  public meetingInput!: FormControl;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(MeetingsActions.load());

    this.meetingsSubs = this.store
      .select('meetings')
      .subscribe(({ meetings }) => {
        this.meetings = meetings;
        this.meetingInput = new FormControl(
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
    const doc = new jsPDF();
    const head = [['#', 'NOMBRE', 'FIRMA']];
    const data = attendences.map((a, i) => [i + 1, a.user.name, '']);

    doc.setFontSize(12);
    doc.text(`LISTA DE ASISTENCIA DE: ${this.meetingInput.value.name}`, 11, 11);

    autoTable(doc, {
      head: head,
      body: data,
      theme: 'grid',
      headStyles: { fillColor: '#3F51B5' },
    });
    doc.save(`${this.meetingInput.value.name} - LISTA DE ASISTENCIA`);
  }
}
