import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivateRoutingModule } from './private-routing.module';
import { PrivateComponent } from './private.component';
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SidenavService } from 'src/app/utils/sidenav.service';

@NgModule({
  declarations: [PrivateComponent, HeaderComponent, SidebarComponent],
  imports: [
    CommonModule,
    PrivateRoutingModule,
    AngularMaterialModule,
  ],
  providers: [SidenavService],
})
export class PrivateModule {}
