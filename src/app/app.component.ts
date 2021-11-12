import { MediaMatcher } from '@angular/cdk/layout';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { User } from './models/user.model';
import { renew } from './state/actions/auth.action';
import { AppState } from './state/app.reducer';
import { SidenavService } from './utils/sidenav.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {
  public auth!: User | null;
  private authSubs!: Subscription;

  mobileQuery!: MediaQueryList;

  private _mobileQueryListener!: () => void;

  @ViewChild('sidenav') sidenav!: MatSidenav;

  get isLogged() {
    return !!this.auth;
  }

  constructor(
    private store: Store<AppState>,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private sidenavService: SidenavService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.store.dispatch(renew());
    this.authSubs = this.store.select('auth').subscribe(({ user }) => {
      this.auth = user;
    });
  }

  ngAfterViewInit() {
    this.sidenavService.sideNavToggleSubject.subscribe(() => {
      this.sidenav?.toggle();
    });
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this._mobileQueryListener);
    this.authSubs?.unsubscribe();
  }
}
