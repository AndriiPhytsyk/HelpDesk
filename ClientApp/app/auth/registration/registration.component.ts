import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthenticationService } from '../../Shared/services/user.service';
import { Router } from '@angular/router';

@Component({
    selector: 'regist',
    templateUrl: './registration.component.html',
})
export class RegistrationComponent implements OnInit {

    form: FormGroup;

    constructor(private authservice: AuthenticationService,
        private router: Router
    ) { }

    ngOnInit() {
        this.form = new FormGroup({
            'name': new FormControl(null, [Validators.required]),
            'company': new FormControl(null, [Validators.required]),
            'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
        });
    }

    onSubmit() {
        const { name, password, company } = this.form.value;

        this.authservice.register(name, password, company)
            .subscribe((user) => {
                if (user) {
              
                    this.router.navigate(['/system']);
                } else {
                    console.error('user already exist');
                }
            })
    }
}