import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Meeting, MeetingData } from 'src/app/models/meeting.model'

@Component({
    selector: 'app-meeting-form',
    templateUrl: './meeting-form.component.html',
    styleUrls: ['./meeting-form.component.scss'],
    standalone: false
})
export class MeetingFormComponent implements OnInit {
  @Input() meeting!: Meeting
  @Output() clickSave = new EventEmitter<MeetingData>()

  form!: FormGroup

  get isEditing() {
    return !!this.meeting
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.createForm()
  }

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched()
      return
    }

    this.clickSave.emit(this.form.value)
  }

  private createForm() {
    this.form = this.fb.group({
      name: [this.meeting ? this.meeting.name : '', [Validators.required, Validators.minLength(6)]],
      date: [this.meeting ? this.meeting.date : new Date().toISOString(), [Validators.required]],
      description: [
        this.meeting ? this.meeting.description : '',
        [Validators.required, Validators.minLength(6)],
      ],
      conclutions: [this.meeting ? this.meeting.conclutions : ''],
      fine_amount: [
        this.meeting ? this.meeting.fine_amount : 20,
        [Validators.required, Validators.min(0), Validators.max(1000)],
      ],
    })
  }
}
