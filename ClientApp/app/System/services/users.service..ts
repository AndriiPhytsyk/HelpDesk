import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AppConfig } from "../../app.config";
import { Observable } from "rxjs/Observable";
import { UserDto } from "../../Shared/Models/UserDto";

@Injectable()
export class UsersService {

    constructor(private http: HttpClient, private config: AppConfig) { }

        
    getOrganizationUsers(): Observable<any> {
        return this.http.get(this.config.apiUrl + '/api/users/all', this.jwt())
               
    }

    getProjectMembers(id: number) {
        return this.http.get(this.config.apiUrl + '/api/users/getProjectUsers/' + id, this.jwt());
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