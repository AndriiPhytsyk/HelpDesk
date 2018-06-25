import { Component, OnInit } from '@angular/core';



import { FormGroup, FormControl } from '@angular/forms';
import { ProjectService } from './services/project.service';
import { Organization } from '../Shared/Models/organization.model';
import { Project } from '../Shared/Models/project.model';
import { TaskService } from './services/tasks.service';
import { Task } from '../Shared/Models/task.model';

import { NgbActiveModal, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { TaskComponent } from './Task/task.component.';
import { Router } from '@angular/router';
import { ProjectComponent } from './Project/project.component';
import { MatDialog } from '@angular/material';
import { UsersService } from './services/users.service.';
import { UserDto } from '../Shared/Models/UserDto';
import { CurrentUser } from '../Shared/Models/currentUser.model.';


@Component({
    selector: 'system',
    templateUrl: './system.component.html',
    styleUrls: ['./system.component.css'],


})
export class SystemComponent implements OnInit {

    closeResult: string;
    newProjectForm: FormGroup;
    projects: Project[] = [];

    isLoaded = false;
    selectedProject: Project;

    tasks: Task[] = [];
    projectTasksToDo: Task[] = [];
    projectTasksProgress: Task[] = [];
    projectTasksCompleted: Task[] = [];

    editMode: boolean;

    tasksToDo: Task[] = [];
    activeTasks: Task[] = [];
    completedTasks: Task[] = [];

    projectMembers: any;

    organizationUsers: UserDto[] = [];

    currentUser: CurrentUser;

    constructor(
        private router: Router,
        private modalService: NgbModal,
        private projectService: ProjectService,
        private taskService: TaskService,
        public dialog: MatDialog,
        public usersService: UsersService
    ) { }



    openDialog(): void {
        let dialogRef = this.dialog.open(ProjectComponent, {
            width: '250px',
            data: this.organizationUsers
        });
        dialogRef.afterClosed().subscribe(project => {
            this.projects.push(project);
            this.loadProjects;
        });
    }


    logOut() {
        window.localStorage.clear();
        this.router.navigate(['/log'])
    }


    open(task: Task) {

        if (task) {
            this.editMode = true;
        } else {
            this.editMode = false;
        }
        const modal = this.modalService.open(TaskComponent);
        modal.componentInstance.selectedProject = this.selectedProject;
        modal.componentInstance.projectMembers = this.projectMembers;
        modal.componentInstance.editMode = this.editMode;
        modal.componentInstance.selectedTask = task;

        

        modal.result.then((task: Task) => {
            if (task == null) {
                this.loadTasks();
            };
            if (+task.user == this.currentUser.id) {
                switch (task.state) {
                    case 'ToDo':
                        this.projectTasksToDo.push(task);
                        break;
                    case 'In Progress':
                        this.projectTasksProgress.push(task);
                        break;
                    case 'Completed':
                        this.projectTasksCompleted.push(task);
                        break;
                }
            }
            this.loadTasks();
        }).catch((error) => {
            console.log(error);
        });
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

    loadTasks() {
        this.taskService.getTasksList()
            .subscribe(tasks => {
                if (this.selectedProject && this.editMode) {
                    this.projectTasksToDo = tasks.filter((t: Task) => { return (t.state == 'ToDo') && (this.selectedProject.id == t.currentProjectId) });
                    this.projectTasksProgress = tasks.filter((t: Task) => { return (t.state == 'In Progress') && (this.selectedProject.id == t.currentProjectId) });
                    this.projectTasksCompleted = tasks.filter((t: Task) => { return (t.state == 'Completed') && (this.selectedProject.id == t.currentProjectId) });
                } else {
                    this.tasksToDo = tasks.filter((t: Task) => { return t.state == 'ToDo' });
                    this.activeTasks = tasks.filter((t: Task) => { return t.state == 'In Progress' });
                    this.completedTasks = tasks.filter((t: Task) => { return t.state == 'Completed' });
                }
            })
    }

    loadProjects() {
        this.projectService.getProjectList()
            .subscribe((projects) => {
                this.projects = projects
                this.isLoaded = true;
            }
            );
    }

    getOrganizationUsers() {
        this.usersService.getOrganizationUsers()
            .subscribe(users => this.organizationUsers = users);
    }

    ngOnInit() {
        //if (!localStorage.getItem('currentUser')) {
        //    this.router.navigate(['/log'])
        //}
        this.currentUser = JSON.parse(window.localStorage.getItem('currentUser'));
        this.getOrganizationUsers();
        this.loadProjects();
        this.loadTasks();
        this.newProjectForm = new FormGroup({
            'title': new FormControl(null),
        });
    }

    selectProject(project: Project) {
        this.selectedProject = project;

        this.projectTasksToDo = this.tasksToDo.filter((t: Task) => {
            return (t.currentProjectId == project.id) && (t.state == 'ToDo');
        });
        this.projectTasksProgress = this.activeTasks.filter((t: Task) => {
            return (t.currentProjectId == project.id) && (t.state == 'In Progress');
        });
        this.projectTasksCompleted = this.completedTasks.filter((t: Task) => {
            return (t.currentProjectId == project.id) && (t.state == 'Completed');
        });

        this.usersService.getProjectMembers(project.id)
            .subscribe((projectMembers: UserDto) => this.projectMembers = projectMembers);
    }

    selectAll() {
        this.selectedProject = null;
        this.editMode = false;
        this.loadTasks();

    }
    deleteTask(id: number) {

        this.taskService.deleteTask(id)
            .subscribe(() => this.loadTasks());
    }

}



