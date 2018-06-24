import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Task } from '../../Shared/Models/task.model';
import { TaskService } from '../services/tasks.service';
import { Project } from '../../Shared/Models/project.model';




@Component({
    selector: 'task-modal',
    templateUrl: './task.component.html'


})
export class TaskComponent implements OnInit {


    constructor(
        public tasksService: TaskService,
        public activeModal: NgbActiveModal
    ) { }

    form: FormGroup;
    @Input() selectedProject: Project;
    @Output() onTaskAdd = new EventEmitter<Task>();
    @Output() onTaskEdit = new EventEmitter<Task>();
    @Input() editMode: boolean;
    @Input() selectedTask: Task;
    @Input() projectTasks: Task[];
    @Input() projectMembers: Task[];

   
    ngOnInit() {
        
        this.form = new FormGroup({
            'title': new FormControl(null, [Validators.required]),
            'description': new FormControl(null, [Validators.required]),
            'state': new FormControl(null, [Validators.required]),
            'progress': new FormControl(null, [Validators.required]),
            'effort': new FormControl(null, [Validators.required]),           
            'startDate': new FormControl(null, [Validators.required]),
            'endDate': new FormControl(null, [Validators.required]),
            'user': new FormControl(null, [Validators.required])
            
        });
    }

    createNewTask() {

        let { title, description, state, effort, progress, startDate, endDate, user} = this.form.value;

        
        if (effort > 100) effort = 100;

        const currentProject = this.selectedProject['title'];
        const currentProjectId = this.selectedProject['id'];

        const task = new Task(title, 0, state, description, effort, progress, startDate, endDate, currentProject, currentProjectId, user);
        console.log(task);
       
        this.tasksService.createNewTask(task)
            .subscribe((task: Task) => {
                this.onTaskAdd.emit(task)
                this.activeModal.close(null);

            });
    }

    updateTask() {

        
        let { title, description, state, effort, progress, startDate, endDate } = this.form.value;

        if (effort > 100) effort = 100;

 
        const currentProject = this.selectedProject['title'];
        const currentProjectId = this.selectedProject['id'];    
        
        const task = new Task(title, this.selectedTask.id, state, description, effort, progress, startDate, endDate, currentProject, currentProjectId);
        this.selectedTask.title = title;
        this.selectedTask.state = state;
        this.selectedTask.description = description;
        this.selectedTask.effort = effort;
        this.selectedTask.progress = progress;
        this.selectedTask.startDate = startDate;
        this.selectedTask.endDate = endDate;

        this.tasksService.updateTask(this.selectedTask)
            .subscribe((task: Task) => {
                this.onTaskAdd.emit(task);
                this.activeModal.close(null);

            });
    }


   
}
