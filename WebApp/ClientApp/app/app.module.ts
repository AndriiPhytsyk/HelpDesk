import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent} from './Auth/Login/login.component'
@NgModule({
    imports: [BrowserModule, FormsModule],
    declarations: [AppComponent, LoginComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }