import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent} from './Auth/Login/login.component'
import { AuthModule } from './auth/auth.module';
import { HttpClientModule } from '@angular/common/http';
import { SystemModule } from './System/system.module';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SystemRoutingModule } from './System/system-routing.module';
import { AuthGuardService } from './Shared/services/auth-guard.service';
import { AuthService } from './Shared/services/auth.service';




@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        AuthModule,
        HttpClientModule,
        SystemModule,
        CommonModule, 
        AppRoutingModule,
        NgbModule.forRoot(),
        SystemRoutingModule
    ],

    
    declarations: [AppComponent],
    bootstrap: [AppComponent],
    providers: [AuthGuardService, AuthService]
 
})
export class AppModule { }