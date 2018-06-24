import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders  } from "@angular/common/http";
import { AppConfig } from "../../app.config";
import { Observable } from "rxjs";
import { Project } from "../../Shared/Models/project.model";
import { userInfo } from "os";
import { UserDto } from "../../Shared/Models/UserDto";


@Injectable()
export class ProjectService {

    constructor(private http: HttpClient, private config: AppConfig) { }

    createNewProject(Title: string, MembersId: number[]): Observable<Project> {
        return this.http.post(this.config.apiUrl + '/api/projects', { Title, MembersId }, this.jwt())
        .map((project: Project) => project)
    }

    getProjectList(): Observable<any> {
        return this.http.get(this.config.apiUrl + '/api/projects', this.jwt())
           
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