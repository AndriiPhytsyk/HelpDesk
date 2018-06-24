import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SystemComponent } from './system.component';
import {
    AuthGuardService as AuthGuard
} from '../Shared/services/auth-guard.service';


const routes: Routes = [
    { path: 'system', component: SystemComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule {}
