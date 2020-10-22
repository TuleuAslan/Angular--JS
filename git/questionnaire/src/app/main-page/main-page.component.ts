import { Component, OnInit } from '@angular/core';
import { PageComponent } from '../ui/components/page.component';

@Component({
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent extends PageComponent implements OnInit {
    constructor() {
        super();
        this.isContainer = true;
    }

    ngOnInit(): void {}
}
