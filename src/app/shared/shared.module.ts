import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { ErrorFieldComponent } from './error-field/error-field.component';
import { CoreModule } from '../core/core.module';
import { NavbarComponent } from './navbar/navbar.component';
import { AppRoutingModule } from '../app-routing.module';

;



@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    ErrorFieldComponent,
    NavbarComponent,

  ],
  imports: [
    CommonModule,
    CoreModule,
    AppRoutingModule
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    ErrorFieldComponent,
    NavbarComponent,

  ]
})
export class SharedModule { }
