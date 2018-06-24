import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AppConfig } from "../../app.config";
import { Observable } from "rxjs";
import { Task } from "../../Shared/Models/task.model";



@Injectable()
export class TaskService {

    constructor(private http: HttpClient, private config: AppConfig) { }

    createNewTask(task: Task): Observable<Task> {
        return this.http.post(this.config.apiUrl + '/api/tasks/', task, this.jwt())
            .map((task: Task) => task)
    }

    updateTask(task: Task): Observable<Task> {

        return this.http.put(this.config.apiUrl + '/api/tasks/', task, this.jwt());
    }

    getTasksList(): Observable<any> {
        return this.http.get(this.config.apiUrl + '/api/tasks', this.jwt())
    }

    deleteTask(id: number) {
        return this.http.delete(this.config.apiUrl + '/api/tasks/' + id, this.jwt())
    .map((task: Task) => task)
    }


    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {

            const httpOptions = {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + currentUser.token
                })
            }
            return httpOptions;
        }
        return null;
    }
}