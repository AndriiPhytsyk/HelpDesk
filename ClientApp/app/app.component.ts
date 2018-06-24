import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app',
    templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {

    constructor(private router: Router) { }

    ngOnInit() {
        if (localStorage.getItem('currentUser')) {
            this.router.navigate(['/system'])
        } else {
            this.router.navigate(['/log'])
        }
        } 

}