import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core'
import * as QRCode from 'qrcode'
@Component({
  selector: 'app-qr-code-custom',
  standalone: true,
  template: '<canvas #receiptQR></canvas>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QrCodeCustomComponent implements AfterViewInit {
  @Input({ required: true }) data: any
  @ViewChild('receiptQR') receiptQR?: ElementRef

  ngAfterViewInit(): void {
    if (!this.receiptQR?.nativeElement) return
    QRCode.toCanvas(this.receiptQR.nativeElement, JSON.stringify(this.data))
  }
}
