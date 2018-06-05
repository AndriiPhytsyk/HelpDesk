import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotFoundComponent } from './Shared/components/not-found/not-found.component';
import { SystemComponent } from './System/system.component';
import { LoginComponent } from './auth/login/login.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { AppComponent } from './app.component';

const routes: Routes = [
    {
        path: '', component: AppComponent, children: [
            { path: 'log', component: LoginComponent },
            { path: 'registration', component: RegistrationComponent },
            { path: 'system', component: SystemComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }