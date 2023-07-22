import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { IncomesRoutingModule } from './incomes-routing.module'
import { IncomesComponent } from './incomes.component'
import { IncomeListComponent } from './pages/income-list/income-list.component'
import { IncomeEditComponent } from './pages/income-edit/income-edit.component'
import { IncomeViewComponent } from './pages/income-view/income-view.component'
import { IncomeDetailComponent } from './pages/income-detail/income-detail.component'
import { HttpClientModule } from '@angular/common/http'
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module'
import { ReactiveFormsModule } from '@angular/forms'
import { IncomeFormComponent } from './components/income-form/income-form.component'

@NgModule({
  declarations: [
    IncomesComponent,
    IncomeListComponent,
    IncomeEditComponent,
    IncomeViewComponent,
    IncomeDetailComponent,
    IncomeFormComponent
  ],
  imports: [
    CommonModule,
    IncomesRoutingModule,
    HttpClientModule,
    AngularMaterialModule,
    ReactiveFormsModule,
  ],
})
export class IncomesModule {}
