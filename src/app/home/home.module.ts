import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page/home-page.component';
import { AppRoutingModule } from '../app-routing.module';
import { CoreModule } from '../core/core.module';
import { CustomersCardComponent } from './customers-card/customers-card.component';
import { EmployeesCardComponent } from './employees-card/employees-card.component';




@NgModule({
  declarations: [
    HomePageComponent,
    CustomersCardComponent,
    EmployeesCardComponent,

  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    CoreModule,
  ],
  exports: [
    HomePageComponent
  ]
})
export class HomeModule { }
