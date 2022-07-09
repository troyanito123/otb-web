import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'any',
})
export class SidenavService {
  private state: boolean = true;
  private _isOpened$: BehaviorSubject<boolean> = new BehaviorSubject(
    this.state
  );

  get isOpened$() {
    return this._isOpened$.asObservable();
  }
  constructor() {}

  public toggle(): void {
    this.state = !this.state;
    this._isOpened$.next(this.state);
  }
}
