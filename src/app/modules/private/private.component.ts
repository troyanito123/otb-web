import { MediaMatcher } from '@angular/cdk/layout';
import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AppState } from 'src/app/state/app.reducer';
import { SidenavService } from 'src/app/utils/sidenav.service';

@Component({
    selector: 'app-private',
    templateUrl: './private.component.html',
    styleUrls: ['./private.component.scss'],
    standalone: false
})
export class PrivateComponent implements OnInit, OnDestroy {
  public auth!: User | null;
  private authSubs!: Subscription;
  private sidnavSubs?: Subscription;

  mobileQuery!: MediaQueryList;

  private _mobileQueryListener!: () => void;

  @ViewChild('sidenav') sidenav?: MatSidenav;

  get isLogged() {
    return !!this.auth;
  }

  constructor(
    private store: Store<AppState>,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public sidenavService: SidenavService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.authSubs = this.store.select('auth').subscribe(({ user }) => {
      this.auth = user;
    });
    this.sidnavSubs = this.sidenavService.isOpened$.subscribe(() => {
      this.sidenav?.toggle();
    });
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this._mobileQueryListener);
    this.authSubs?.unsubscribe();
    this.sidnavSubs?.unsubscribe();
  }
}
