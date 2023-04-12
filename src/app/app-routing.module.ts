import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './auth/login-page/login-page.component';
import { AppComponent } from './app.component';
import { ErrorFieldComponent } from './shared/error-field/error-field.component';
import { AuthService } from './core/auth.service';
import { CustomersPageComponent } from './customers/customers-page/customers-page.component';
import { EditCustomerComponent } from './customers/edit-customer/edit-customer.component';
import { CustomerDetailsComponent } from './customers/customer-details/customer-details.component';
import { EmployeesPageComponent } from './employees/employees-page/employees-page.component';
import { HomePageComponent } from './home/home-page/home-page.component';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  {
    path: '',
    canActivateChild: [AuthService],
    children: [
      { path: '', component: HomePageComponent },
      { path: 'edit-customer/:id', component: EditCustomerComponent },
      { path: 'customer-details/:id', component: CustomerDetailsComponent },
      { path: 'customers', component: CustomersPageComponent },
      { path: 'employees', component: EmployeesPageComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
