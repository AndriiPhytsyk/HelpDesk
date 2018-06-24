import { Component, Input, OnInit, Inject, Output } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { UsersService } from "../services/users.service.";
import { UserDto } from "../../Shared/Models/UserDto";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { ProjectService } from "../services/project.service";
import { Project } from "../../Shared/Models/project.model";
import { EventEmitter } from "events";


@Component({
    selector: 'project-modal',
    templateUrl: './project.component.html'

})
export class ProjectComponent implements OnInit {

    newProjectForm: FormGroup;

    constructor(public usersService: UsersService,
        public dialogRef: MatDialogRef<ProjectComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private projectService: ProjectService
    ) { }


    onNoClick(): void {
        this.dialogRef.close();
    }

    ngOnInit() {
        this.newProjectForm = new FormGroup({
            'title': new FormControl(null, [Validators.required]),
            'members': new FormControl(null, [Validators.required])
        })
    }

    createNewProject() {
        const { title, members } = this.newProjectForm.value;


        this.projectService.createNewProject(title, members)
            .subscribe((project) => {
              
                this.dialogRef.close(project);
            });
       
    }
}