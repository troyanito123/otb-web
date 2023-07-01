import { Injectable } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { AlertComponent } from '../layouts/alert/alert.component'

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  public open(title: string, content: string) {
    this.dialog.open(AlertComponent, {
      data: { title, content },
    })
  }
}
