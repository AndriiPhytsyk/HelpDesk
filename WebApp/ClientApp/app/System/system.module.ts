import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SystemComponent } from './system.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TaskComponent } from './Task/task.component.';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
//import { SystemRoutingModule } from './system-routing.module';


@NgModule({
  imports: [
      CommonModule,
      NgbModule.forRoot(),
      BrowserModule,
      ReactiveFormsModule,
      FormsModule
      //SystemRoutingModule

  ],
  declarations: [
      SystemComponent,
      TaskComponent  
    ],
    entryComponents: [TaskComponent],

  providers: []
})
export class SystemModule {}
