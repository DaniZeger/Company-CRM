import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersPageComponent } from './customers-page/customers-page.component';
import { SharedModule } from '../shared/shared.module';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';
import { AppRoutingModule } from '../app-routing.module';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';



@NgModule({
  declarations: [
    CustomersPageComponent,
    AddCustomerComponent,
    EditCustomerComponent,
    CustomerDetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    CoreModule,
    AppRoutingModule
  ],
  exports: [
    CustomersPageComponent,
    AddCustomerComponent,
    EditCustomerComponent
  ]
})
export class CustomersModule { }
