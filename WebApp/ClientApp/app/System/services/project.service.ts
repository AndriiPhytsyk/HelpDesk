import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders  } from "@angular/common/http";
import { AppConfig } from "../../app.config";

@Injectable()
export class ProjectService {

    constructor(private http: HttpClient, private config: AppConfig) { }

    createNewProject(Title: string) {
        return this.http.post(this.config.apiUrl + 'api/projects', { Title }, this.jwt())
    }

    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
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