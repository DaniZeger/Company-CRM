import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './login-page/login-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { SigninPageComponent } from './signin-page/signin-page.component';
import { AppRoutingModule } from '../app-routing.module';



@NgModule({
  declarations: [
    LoginPageComponent,
    SigninPageComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    AppRoutingModule
  ],
  exports: [
    LoginPageComponent,
    SigninPageComponent
  ]
})
export class AuthModule { }
