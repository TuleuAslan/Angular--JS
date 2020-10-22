import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-contact-list',
    templateUrl: './contact-list.component.html',
    styleUrls: ['./contact-list.component.scss'],
})
export class ContactListComponent implements OnInit {
    @Output() contactSelected = new EventEmitter<string>();
    @Output() logout = new EventEmitter();
    @Input() label: string;

    contacts = ['Contact 1', 'Contact 2'];

    constructor() {}

    ngOnInit(): void {

        var input = document.querySelector('#test') as HTMLInputElement;
        input.value = '123';

    }

    navigateToChat(contact: string): void {
        this.contactSelected.emit(contact);
    }

    logoutHandler() {
        this.logout.emit();
    }
}
