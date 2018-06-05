import { Component, Input } from '@angular/core';


import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TaskComponent } from './Task/task.component.';
import { ProjectComponent } from './Project/project.component';
import { FormGroup, FormControl } from '@angular/forms';
import { ProjectService } from './services/project.service';

@Component({
  selector: 'system',
  templateUrl: './system.component.html', 
  styleUrls: ['./system.component.css'],
  


})
export class SystemComponent {

    closeResult: string;
    newProjectForm: FormGroup;

    constructor(
        private modalService: NgbModal,
        private projectService: ProjectService
    ) { }

    ngOnInit() {
        this.newProjectForm = new FormGroup({
            'title': new FormControl(null),
        });
    }

    addNewProject() {
        
        const { title } = this.newProjectForm.value;
        this.projectService.createNewProject(title)
            .subscribe((project: any) => {
                console.log(project);
            })
        this.newProjectForm.reset();
    }

    open() {
        const modalRef = this.modalService.open(TaskComponent, { size: 'lg', backdrop: 'static' });
        modalRef.componentInstance.name = 'World';
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }


    
    isInputFieldTodo: boolean = false;
    isInputFieldProgress: boolean = false;
    isInputFieldCompleted: boolean = false;
    newProjectField: boolean = false;

    addNewProjectField() {
        this.newProjectField = true;
    }

    removeNewProjectField() {
        this.newProjectField = false;
    }

    addInputFieldTodo() {
        this.isInputFieldTodo = true;
    }

    removeInputFieldTodo() {
        this.isInputFieldTodo = false;
    }
    addInputFieldProgress() {
        this.isInputFieldProgress = true;
    }

    removeInputFieldProgress() {
        this.isInputFieldProgress = false;
    }

    addInputFieldCompleted() {
        this.isInputFieldCompleted = true;
    }

    removeInputFieldCompleted() {
        this.isInputFieldCompleted = false;
    }
   


}

    

