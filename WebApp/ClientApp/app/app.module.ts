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





@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        AuthModule,
        HttpClientModule,
        SystemModule,
        CommonModule, 
        AppRoutingModule,
        NgbModule

    ],
    
    declarations: [AppComponent],
    bootstrap: [AppComponent],
    providers: [NgbModule]
 
})
export class AppModule { }