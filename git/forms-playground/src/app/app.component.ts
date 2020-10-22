import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { alpha } from './validators/alpha.validator';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    login = '';
    password = '';

    loginCtrl = new FormControl('', [alpha()]);
    passwordCtrl = new FormControl('');

    loginForm = new FormGroup({
        login: this.loginCtrl,
        password: this.passwordCtrl,
    });

    textControl = new FormControl('');
    numberControl = new FormControl(1);
    radioControl = new FormControl(1);
    checkboxControl = new FormControl(true);
    selectControl = new FormControl();
    counterControl = new FormControl(10);

    counterValue = 10;

    form = new FormGroup({
        text: this.textControl,
        number: this.numberControl,
        radio: this.radioControl,
        checkbox: this.checkboxControl,
        select: this.selectControl,
        counter: this.counterControl,
    });

    constructor() {
        this.loginCtrl.valueChanges.subscribe((value) => {
            console.log(value);
        });

        this.loginForm.valueChanges.subscribe((form) => console.log(form));
    }
}
