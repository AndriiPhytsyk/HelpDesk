import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { AppConfig } from '../../app.config';
import { HttpClient } from '@angular/common/http';
import { UserDto } from '../Models/UserDto';


    
@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient, private config: AppConfig) { }

    login(name: string, password: string, organization:string): Observable<UserDto> {
        return this.http.post<UserDto>(this.config.apiUrl + '/api/auth/login', { name, password, organization })
            .map((user: UserDto) => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
                return user
            });
    }
    register(name: string, password: string, organization: string): Observable<UserDto> {
        return this.http.post<UserDto>(this.config.apiUrl + '/api/auth/register', { name, password, organization })
            .map((user: UserDto) => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                   
                }
                return user
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}