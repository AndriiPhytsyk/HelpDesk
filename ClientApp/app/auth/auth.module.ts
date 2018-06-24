import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { AuthComponent } from './auth.component';
import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from '../Shared/services/user.service';
import { AppConfig } from '../app.config';


@NgModule({
  declarations: [
    LoginComponent,
    RegistrationComponent,
    AuthComponent
    
  ],
  imports: [
    AuthRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    CommonModule

    ],
    providers: [AuthenticationService, AppConfig]
})
export class AuthModule {}
