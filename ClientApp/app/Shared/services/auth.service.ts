import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthService {
    constructor(public jwtHelper: JwtHelperService) { }
    // ...
    public isAuthenticated(): boolean {
        if (window.localStorage.getItem('currentUser')) {
            return true
        }

        return false;
    }
}