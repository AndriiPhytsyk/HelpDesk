import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthenticationService } from '../../Shared/services/user.service';
import { Router } from '@angular/router';

@Component({
    selector: 'login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {

    form: FormGroup;
    constructor(
        private authservice: AuthenticationService,
        private router: Router
    ) { }
    ngOnInit() {
        this.form = new FormGroup({
            'name': new FormControl(null, [Validators.required]),
            'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
            'organization': new FormControl(null, [Validators.required])
        });
    }

    onSubmit() {
        console.log(this.form);
        const { name, password, organization } = this.form.value;

        this.authservice.login(name, password, organization)
            .subscribe((user) => {
                if (user) {
                    this.router.navigate(['/system']);
                } else {
                    console.error('wrong name or password');
                }
            })
    }


}