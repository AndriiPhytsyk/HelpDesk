import { SystemComponent } from './system.component';
import { ProjectComponent } from './Project/project.component';
import { ProjectService } from './services/project.service';
import { TaskService } from './services/tasks.service';
import { TaskComponent } from './Task/task.component.';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule, NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UsersService } from './services/users.service.';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';






@NgModule({
  imports: [
      CommonModule,
      BrowserModule,
      ReactiveFormsModule,
      FormsModule,
      NgbModule.forRoot(),
      MatButtonModule,
      MatCheckboxModule,
      MatSelectModule,
      MatFormFieldModule,
      MatInputModule,
      BrowserAnimationsModule,
      MatDialogModule


    ],
    exports: [MatButtonModule, MatCheckboxModule, MatSelectModule, MatFormFieldModule, MatInputModule, MatDialogModule],
  declarations: [
      SystemComponent,
      TaskComponent,
      ProjectComponent
 
    ],

    entryComponents: [TaskComponent, ProjectComponent],

    providers: [ProjectService, TaskService, UsersService, NgbModal, NgbActiveModal, MatDialog]
})
export class SystemModule {}
