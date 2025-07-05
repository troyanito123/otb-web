import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AttendencesActions } from 'src/app/state/actions/attendences.actions';
import { Meeting } from 'src/app/models/meeting.model';
import { Attendence } from 'src/app/models/attendence.model';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-report-attendences',
    templateUrl: './report-attendences.component.html',
    styleUrls: ['./report-attendences.component.scss'],
    standalone: false
})
export class ReportAttendencesComponent implements OnInit, OnDestroy {
  public meetings: Meeting[] = [];
  readonly meetingInput: FormControl;

  constructor(
    private store: Store,
    private route: ActivatedRoute,
  ) {
    this.meetingInput = new FormControl(null, Validators.required)
  }

  ngOnInit(): void {
    this.route.data.subscribe(({meetings}) => {
      this.meetings = meetings
    }) 
  }

  ngOnDestroy(): void {
    this.store.dispatch(AttendencesActions.clean());
  }

  public generateReport() {
    if(this.meetingInput.invalid) {
      this.meetingInput.markAllAsTouched()
      return;
    }
    this.store.dispatch(
      AttendencesActions.loadByMeeting({
        meetingId: this.meetingInput.value.id,
        meetingName: this.meetingInput.value.name,
        handlerCallback: (attendences: Attendence[], meetingName: string) => {
          const head = [['#', 'NOMBRE', 'FIRMA']];
          const body = attendences.map((a, i) => [i + 1, a.user.name, '']);
      
          const title = `LISTA DE ASISTENCIA DE: ${meetingName}`;
      
          return {title, head, body, type: 'ASISTENCIAS'}
        }
      })
    );
  }
}
