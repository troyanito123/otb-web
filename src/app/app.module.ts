import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { HeaderComponent } from './layouts/header/header.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { LoadingComponent } from './layouts/loading/loading.component';
import { AlertComponent } from './layouts/alert/alert.component';
import { DeleteDialogComponent } from './layouts/delete-dialog/delete-dialog.component';
import { ConfirmDialogComponent } from './layouts/confirm-dialog/confirm-dialog.component';

import { HttpHeadersService } from './interceptors/http-headers.service';

/*Change language to spanish */
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeEs, 'es');
/*Change language to spanish */

/* Change language to material table */
import { MatPaginatorIntl } from '@angular/material/paginator';
import { getSpanishPaginatorIntl } from './utils/spanish-paginator-intl';
/* Change language to material table */

/*CONFIG STORE*/
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { appReducers } from './state/app.reducer';
import { EffectsArray } from './state/effects';
import { environment } from 'src/environments/environment';

/*CONFIG STORE */

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    LoadingComponent,
    AlertComponent,
    DeleteDialogComponent,
    ConfirmDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot(EffectsArray),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    BrowserAnimationsModule,
    AngularMaterialModule,
    FlexLayoutModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es' },
    { provide: MatPaginatorIntl, useValue: getSpanishPaginatorIntl() },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpHeadersService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
